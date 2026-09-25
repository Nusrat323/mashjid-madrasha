
const messages = {
  "auth/invalid-credential": "ইমেইল বা পাসওয়ার্ড সঠিক নয়",

  "auth/wrong-password": "ইমেইল বা পাসওয়ার্ড সঠিক নয়",

  "auth/user-not-found": "ইমেইল বা পাসওয়ার্ড সঠিক নয়",

  "auth/invalid-email": "ইমেইল ঠিকানাটি সঠিক নয়",

  "auth/email-already-in-use":
    "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে। অনুগ্রহ করে Google দিয়ে লগইন করুন",

  "auth/weak-password":
    "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে",

  "auth/popup-closed-by-user":
    "লগইন উইন্ডো বন্ধ করে দেওয়া হয়েছে",

  "auth/too-many-requests":
    "অনেকবার চেষ্টা করা হয়েছে, একটু পরে আবার চেষ্টা করুন",

  "auth/network-request-failed":
    "ইন্টারনেট সংযোগ পরীক্ষা করুন",
};

const fallback = "লগইন করতে সমস্যা হয়েছে, আবার চেষ্টা করুন";

export const authErrorMessage = (err) => {
  if (!err.code) return err.message || fallback;

  return messages[err.code] || fallback;
};

