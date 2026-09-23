import User from "../models/User.js";

export const syncUser = async (req, res) => {
  const { uid, email, name, picture, email_verified: emailVerified } = req.firebaseUser;
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const isAdminEmail = Boolean(adminEmail && emailVerified && email?.toLowerCase() === adminEmail);

  let user = await User.findOne({ uid });

  if (!user) {
    user = await User.create({
      uid,
      email,
      name: req.body.name || name || email.split("@")[0],
      photo: picture || "",
      role: isAdminEmail ? "admin" : "user",
    });
    return res.json(user);
  }

  if (isAdminEmail && user.role !== "admin") user.role = "admin";
  if (picture && !user.photo) user.photo = picture;
  await user.save();

  res.json(user);
};

export const updateMe = async (req, res) => {
  const { name, phone } = req.body;

  if (name !== undefined) req.user.name = name;
  if (phone !== undefined) req.user.phone = phone;
  await req.user.save();

  res.json(req.user);
};

export const getUsers = async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
};

export const updateRole = async (req, res) => {
  const { role } = req.body;

  if (!["user", "admin"].includes(role)) {
    return res.status(400).json({ message: "ভূমিকা সঠিক নয়" });
  }

  if (req.params.id === req.user._id.toString()) {
    return res.status(400).json({ message: "নিজের ভূমিকা পরিবর্তন করা যাবে না" });
  }

  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });

  if (!user) {
    return res.status(404).json({ message: "ব্যবহারকারী পাওয়া যায়নি" });
  }

  res.json(user);
};
