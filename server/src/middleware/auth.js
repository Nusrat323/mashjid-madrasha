import admin from "../config/firebase.js";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "লগইন করা প্রয়োজন" });
  }

  try {
    req.firebaseUser = await admin.auth().verifyIdToken(token);
    next();
  } catch {
    res.status(401).json({ message: "লগইনের মেয়াদ শেষ, আবার লগইন করুন" });
  }
};

export const loadUser = async (req, res, next) => {
  const user = await User.findOne({ uid: req.firebaseUser.uid });

  if (!user) {
    return res.status(401).json({ message: "ব্যবহারকারী পাওয়া যায়নি" });
  }

  req.user = user;
  next();
};

export const protect = [verifyToken, loadUser];

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "এই কাজের অনুমতি আপনার নেই" });
  }
  next();
};
