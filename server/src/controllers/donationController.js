import Donation from "../models/Donation.js";
import { createPayment, executePayment, isBkashConfigured } from "../services/bkash.js";

const anonymousName = "নাম প্রকাশে অনিচ্ছুক";

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const createManualDonation = async (req, res) => {
  const { amount, purpose, method, phone, senderNumber, transactionId, isAnonymous, note } = req.body;

  if (!transactionId?.trim()) {
    return res.status(400).json({ message: "ট্রানজেকশন আইডি দিন" });
  }

  const duplicate = await Donation.findOne({ transactionId: transactionId.trim() });

  if (duplicate) {
    return res.status(409).json({ message: "এই ট্রানজেকশন আইডি আগেই জমা দেওয়া হয়েছে" });
  }

  const donation = await Donation.create({
    user: req.user._id,
    donorName: req.user.name || req.user.email,
    donorEmail: req.user.email,
    amount: Number(amount),
    purpose,
    method,
    phone,
    senderNumber,
    transactionId,
    isAnonymous: Boolean(isAnonymous),
    note,
    status: "pending",
  });

  res.status(201).json(donation);
};

export const startBkashPayment = async (req, res) => {
  if (!isBkashConfigured()) {
    return res.status(503).json({ message: "বিকাশ অনলাইন পেমেন্ট এখন চালু নেই" });
  }

  const { amount, purpose, phone, isAnonymous, note } = req.body;

  const donation = await Donation.create({
    user: req.user._id,
    donorName: req.user.name || req.user.email,
    donorEmail: req.user.email,
    amount: Number(amount),
    purpose,
    method: "bkash",
    phone,
    isAnonymous: Boolean(isAnonymous),
    note,
    status: "pending",
  });

  try {
    const payment = await createPayment({
      amount: donation.amount,
      invoice: donation._id.toString(),
      callbackURL: `${process.env.SERVER_URL}/api/donations/bkash/callback`,
      payerReference: phone || req.user.email,
    });

    donation.paymentId = payment.paymentID;
    await donation.save();

    res.json({ url: payment.bkashURL });
  } catch (err) {
    await donation.deleteOne();
    res.status(502).json({ message: err.message });
  }
};

export const bkashCallback = async (req, res) => {
  const { paymentID, status } = req.query;
  const finish = (result) => res.redirect(`${process.env.CLIENT_URL}/donate/result?status=${result}`);

  const donation = paymentID ? await Donation.findOne({ paymentId: paymentID }) : null;

  if (!donation || donation.status !== "pending") {
    return finish("failed");
  }

  if (status !== "success") {
    donation.status = "rejected";
    await donation.save();
    return finish(status === "cancel" ? "cancelled" : "failed");
  }

  try {
    const result = await executePayment(paymentID);

    if (result.transactionStatus === "Completed") {
      donation.status = "completed";
      donation.transactionId = result.trxID;
      await donation.save();
      return finish("success");
    }
  } catch (err) {
    console.error("bKash execute failed:", err.message);
  }

  donation.status = "rejected";
  await donation.save();
  finish("failed");
};

export const getMyDonations = async (req, res) => {
  const donations = await Donation.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(donations);
};

export const getRecentDonations = async (req, res) => {
  const donations = await Donation.find({ status: "completed" }).sort({ createdAt: -1 }).limit(8).lean();

  res.json(
    donations.map((item) => ({
      _id: item._id,
      name: item.isAnonymous ? anonymousName : item.donorName,
      amount: item.amount,
      purpose: item.purpose,
      createdAt: item.createdAt,
    }))
  );
};

export const getPublicStats = async (req, res) => {
  const [stats] = await Donation.aggregate([
    { $match: { status: "completed" } },
    { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } },
  ]);

  res.json({ total: stats?.total || 0, count: stats?.count || 0 });
};

export const getAllDonations = async (req, res) => {
  const { status, method, purpose, search, from, to, page = 1, limit = 12 } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (method) filter.method = method;
  if (purpose) filter.purpose = purpose;

  if (search?.trim()) {
    const regex = new RegExp(escapeRegex(search.trim()), "i");
    filter.$or = [{ donorName: regex }, { donorEmail: regex }, { transactionId: regex }, { phone: regex }];
  }

  if (from || to) {
    filter.createdAt = {};
    if (from) filter.createdAt.$gte = new Date(from);
    if (to) {
      const end = new Date(to);
      end.setHours(23, 59, 59, 999);
      filter.createdAt.$lte = end;
    }
  }

  const perPage = Number(limit);
  const skip = (Number(page) - 1) * perPage;

  const [items, total] = await Promise.all([
    Donation.find(filter).sort({ createdAt: -1 }).skip(skip).limit(perPage),
    Donation.countDocuments(filter),
  ]);

  res.json({ items, total, pages: Math.max(1, Math.ceil(total / perPage)) });
};

export const updateDonationStatus = async (req, res) => {
  const { status } = req.body;

  if (!["pending", "completed", "rejected"].includes(status)) {
    return res.status(400).json({ message: "অবস্থা সঠিক নয়" });
  }

  const donation = await Donation.findByIdAndUpdate(req.params.id, { status }, { new: true });

  if (!donation) {
    return res.status(404).json({ message: "দান পাওয়া যায়নি" });
  }

  res.json(donation);
};

export const deleteDonation = async (req, res) => {
  await Donation.findByIdAndDelete(req.params.id);
  res.json({ message: "মুছে ফেলা হয়েছে" });
};
