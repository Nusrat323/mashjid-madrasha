
import admin from "../config/firebase.js";
import User from "../models/User.js";


/*
  Firebase ID Token Verify
*/
export const verifyToken = async (
  req,
  res,
  next
) => {
  const header =
    req.headers.authorization || "";

  const token = header.startsWith("Bearer ")
    ? header.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({
      message: "লগইন করা প্রয়োজন",
    });
  }

  try {
    req.firebaseUser =
      await admin.auth().verifyIdToken(token);

    next();
  } catch (error) {
    console.error(
      "Firebase token verification failed:",
      error.message
    );

    return res.status(401).json({
      message:
        "লগইনের মেয়াদ শেষ, আবার লগইন করুন",
    });
  }
};


/*
  Firebase user-এর MongoDB user খুঁজে বের করা
*/
export const loadUser = async (
  req,
  res,
  next
) => {
  try {
    const user = await User.findOne({
      uid: req.firebaseUser.uid,
    });

    if (!user) {
      return res.status(401).json({
        message:
          "ব্যবহারকারী পাওয়া যায়নি",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(
      "Load user error:",
      error.message
    );

    return res.status(500).json({
      message:
        "ব্যবহারকারীর তথ্য যাচাই করা যায়নি",
    });
  }
};


/*
  Protected route
*/
export const protect = [
  verifyToken,
  loadUser,
];


/*
  যেকোনো admin-এর জন্য
  সাধারণ admin-protected route
*/
export const adminOnly = (
  req,
  res,
  next
) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      message:
        "এই কাজের অনুমতি আপনার নেই",
    });
  }

  next();
};


/*
  শুধুমাত্র ADMIN_EMAIL account
  sensitive admin actions করতে পারবে।

  বর্তমানে:
  - User delete
*/
export const superAdminOnly = (
  req,
  res,
  next
) => {
  const adminEmail =
    process.env.ADMIN_EMAIL
      ?.trim()
      .toLowerCase();

  const currentEmail =
    req.firebaseUser?.email
      ?.trim()
      .toLowerCase();

  /*
    দুইটি জিনিস অবশ্যই match করতে হবে:

    1. Firebase logged-in email
       = ADMIN_EMAIL

    2. MongoDB user role
       = admin
  */
  if (
    !adminEmail ||
    !currentEmail ||
    currentEmail !== adminEmail ||
    req.user?.role !== "admin"
  ) {
    return res.status(403).json({
      message:
        "এই কাজটি শুধুমাত্র প্রধান অ্যাডমিন করতে পারবেন",
    });
  }

  next();
};

