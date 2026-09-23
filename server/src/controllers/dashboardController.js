import Donation from "../models/Donation.js";
import User from "../models/User.js";
import Message from "../models/Message.js";

const group = (id) => ({ $group: { _id: id, total: { $sum: "$amount" }, count: { $sum: 1 } } });

export const getDashboard = async (req, res) => {
  const completed = { status: "completed" };
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const timezone = "Asia/Dhaka";

  const [overall, thisMonth, byMethod, byPurpose, monthly, pending, users, unreadMessages, recent] =
    await Promise.all([
      Donation.aggregate([{ $match: completed }, group(null)]),
      Donation.aggregate([{ $match: { ...completed, createdAt: { $gte: monthStart } } }, group(null)]),
      Donation.aggregate([{ $match: completed }, group("$method")]),
      Donation.aggregate([{ $match: completed }, group("$purpose")]),
      Donation.aggregate([
        { $match: completed },
        group({
          year: { $year: { date: "$createdAt", timezone } },
          month: { $month: { date: "$createdAt", timezone } },
        }),
        { $sort: { "_id.year": -1, "_id.month": -1 } },
        { $limit: 6 },
      ]),
      Donation.countDocuments({ status: "pending" }),
      User.countDocuments(),
      Message.countDocuments({ isRead: false }),
      Donation.find().sort({ createdAt: -1 }).limit(6),
    ]);

  res.json({
    total: overall[0]?.total || 0,
    count: overall[0]?.count || 0,
    monthTotal: thisMonth[0]?.total || 0,
    byMethod,
    byPurpose,
    monthly: monthly.reverse(),
    pending,
    users,
    unreadMessages,
    recent,
  });
};
