import { FaMosque, FaQuran, FaBookOpen, FaHandHoldingHeart, FaUsers, FaMoon, FaChild, FaChalkboardTeacher } from "react-icons/fa";

export const site = {
  name: "পাইকপাড়া কাজীবাড়ী মসজিদ",
  bannerImage: "/public/images/image2.png",
};

export const navLinks = [
  { to: "/", label: "হোম" },
  { to: "/about", label: "আমাদের সম্পর্কে" },
  { to: "/madrasha", label: "মাদ্রাসা" },
  { to: "/notices", label: "নোটিশ" },
  { to: "/gallery", label: "গ্যালারি" },
  { to: "/contact", label: "যোগাযোগ" },
];

export const defaultSettings = {
  phone: "",
  email: "",
  address: "পাইকপাড়া, কাজীবাড়ী",
  bkashNumber: "",
  nagadNumber: "",
  bankName: "",
  bankAccountName: "",
  bankAccountNumber: "",
  bankBranch: "",
  bkashGateway: false,
  prayerTimes: {
    fajr: "৫:১৫",
    dhuhr: "১:১৫",
    asr: "৪:৩০",
    maghrib: "সূর্যাস্তের পর",
    isha: "৮:০০",
    jummah: "১:৩০",
  },
};

export const services = [
  {
    icon: FaMosque,
    title: "পাঁচ ওয়াক্ত নামাজ ও জুমুআ",
    text: "নিয়মিত জামাত, জুমুআর খুতবা এবং তারাবিহ ও ঈদের জামাতের সুব্যবস্থা।",
  },
  {
    icon: FaQuran,
    title: "কুরআন শিক্ষা",
    text: "শিশু ও বড়দের জন্য শুদ্ধ তিলাওয়াত শেখার নিয়মিত ক্লাস।",
  },
  {
    icon: FaBookOpen,
    title: "দ্বীনি আলোচনা",
    text: "সাপ্তাহিক দারস, মাহফিল এবং মাসআলা-মাসায়েলের আসর।",
  },
  {
    icon: FaHandHoldingHeart,
    title: "সমাজসেবা",
    text: "গরিব, এতিম ও অসহায় মানুষের পাশে দাঁড়ানোর নানা উদ্যোগ।",
  },
  {
    icon: FaUsers,
    title: "মহল্লার মিলনকেন্দ্র",
    text: "তরুণদের নৈতিক গঠন ও পারস্পরিক সহযোগিতার একটি নির্ভরযোগ্য জায়গা।",
  },
  {
    icon: FaMoon,
    title: "রমজান ও ঈদ আয়োজন",
    text: "ইফতার, তারাবিহ, ই'তিকাফ এবং ঈদের জামাতের সুশৃঙ্খল আয়োজন।",
  },
];

export const departments = [
  {
    icon: FaQuran,
    title: "নূরানী ও নাজেরা বিভাগ",
    text: "শুদ্ধ উচ্চারণে কুরআন পড়া শেখার ভিত্তি গড়ে তোলার বিভাগ। ছোট শিশুদের জন্য সহজ পদ্ধতিতে পাঠদান।",
  },
{
  icon: FaBookOpen,
  title: "হিফজ বিভাগ",
  text: "কুরআনুল কারীম হিফজের জন্য অভিজ্ঞ উস্তাদদের তত্ত্বাবধানে নিয়মিত পাঠদান, মুখস্থ অনুশীলন ও পুনরাবৃত্তির মাধ্যমে সুন্দর ও সুশৃঙ্খল শিক্ষা কার্যক্রম পরিচালিত হয়।",
},

  {
    icon: FaChild,
    title: "মক্তব ও দ্বীনিয়াত",
    text: "দৈনন্দিন জীবনের প্রয়োজনীয় মাসআলা, দোয়া, আদব ও আখলাক শেখার বিভাগ।",
  },
  {
    icon: FaChalkboardTeacher,
    title: "আরবি ও ইসলামি শিক্ষা",
    text: "আরবি ভাষা, আকিদা ও ইসলামের ইতিহাসের সহজ পাঠ, যা শিক্ষার্থীর দ্বীনি ভিত মজবুত করে।",
  },
];

export const purposes = [
  { value: "general", label: "সাধারণ দান" },
  { value: "madrasha", label: "মাদ্রাসার খরচ" },
  { value: "construction", label: "মসজিদ নির্মাণ ও সংস্কার" },
  { value: "orphan", label: "এতিম ও গরিব শিক্ষার্থী" },
  { value: "zakat", label: "যাকাত" },
  { value: "sadaqah", label: "সদকা" },
];

export const methods = [
  {
    value: "bkash",
    label: "বিকাশ",
    active: "border-pink-500 bg-pink-50 text-pink-700",
  },
  {
    value: "nagad",
    label: "নগদ",
    active: "border-orange-500 bg-orange-50 text-orange-700",
  },
  {
    value: "bank",
    label: "ব্যাংক",
    active: "border-indigo-500 bg-indigo-50 text-indigo-700",
  },
];

export const noticeCategories = [
  { value: "general", label: "সাধারণ", className: "bg-slate-100 text-slate-700" },
  { value: "madrasha", label: "মাদ্রাসা", className: "bg-indigo-100 text-indigo-700" },
  { value: "jummah", label: "জুমুআ", className: "bg-amber-100 text-amber-800" },
  { value: "urgent", label: "জরুরি", className: "bg-rose-100 text-rose-700" },
];

export const statusMap = {
  pending: { label: "যাচাই চলছে", className: "bg-amber-100 text-amber-800" },
  completed: { label: "সম্পন্ন", className: "bg-sky-100 text-sky-800" },
  rejected: { label: "বাতিল", className: "bg-rose-100 text-rose-700" },
};


export const journey = [
  {
    year: "১৯৮৫",
    title: "মসজিদের গোড়াপত্তন",
    text: "মহল্লার কয়েকজন মুরুব্বির উদ্যোগে একটি ছোট্ট টিনশেড ঘরে পাইকপাড়া কাজীবাড়ী মসজিদের যাত্রা শুরু হয়।",
  },
  {
    year: "১৯৯৮",
    title: "মাদ্রাসা বিভাগ চালু",
    text: "শিশুদের কুরআন শিক্ষার জন্য মসজিদ সংলগ্ন জায়গায় নূরানী ও নাজেরা বিভাগ চালু করা হয়।",
  },
  {
    year: "২০১০",
    title: "পাকা ভবন নির্মাণ",
    text: "মুসল্লি ও দাতাদের সহযোগিতায় মসজিদের বর্তমান দ্বিতল ভবনের নির্মাণকাজ সম্পন্ন হয়।",
  },
  {
    year: "২০১৮",
    title: "হিফজ বিভাগ সংযোজন",
    text: "কুরআনুল কারীম মুখস্থ করার জন্য পৃথক হিফজ বিভাগ ও আবাসিক ব্যবস্থা চালু করা হয়।",
  },
  {
    year: "বর্তমান",
    title: "ডিজিটাল সেবার সূচনা",
    text: "স্বচ্ছতা নিশ্চিত করতে অনলাইনে দান, নোটিশ ও অনুষ্ঠানের তথ্য মুসল্লিদের জন্য উন্মুক্ত করা হলো।",
  },
];

export const statHighlights = [
  { value: 1985, suffix: "", label: "প্রতিষ্ঠাকাল", isYear: true },
  { value: 3, suffix: "টি", label: "শিক্ষা বিভাগ" },
  { value: 120, suffix: "+", label: "মাদ্রাসার শিক্ষার্থী" },
  { value: 5, suffix: "ওয়াক্ত", label: "নিয়মিত জামাত" },
];

export const faqs = [
  {
    question: "মাদ্রাসায় ভর্তি হতে কী করতে হবে?",
    answer:
      "মাদ্রাসার ভর্তি বছরব্যাপী চলমান থাকে। শিক্ষার্থীর বয়স ও যোগ্যতা অনুযায়ী উপযুক্ত বিভাগে ভর্তির জন্য মসজিদ কমিটির সঙ্গে সরাসরি অথবা যোগাযোগ পাতা থেকে বার্তা পাঠিয়ে যোগাযোগ করুন।",
  },
  {
    question: "অনলাইনে দান করলে তা নিরাপদ কি না?",
    answer:
      "হ্যাঁ। দান করতে লগইন বাধ্যতামূলক, প্রতিটি দানের তথ্য নিরাপদে সংরক্ষিত হয় এবং আপনি নিজের ড্যাশবোর্ড থেকে যেকোনো সময় আপনার সব দানের হিসাব দেখতে পারবেন।",
  },
  {
    question: "বিকাশ বা নগদে দান করার পর কী করতে হবে?",
    answer:
      "নির্দিষ্ট নম্বরে টাকা পাঠানোর পর সেই ট্রানজেকশন আইডি (TrxID) ও আপনার নম্বরটি দান ফর্মে জমা দিন। কমিটি যাচাই করার পর দানটি সম্পন্ন হিসেবে চিহ্নিত হবে।",
  },
  {
    question: "যাকাত বা সদকা নির্দিষ্ট করে দেওয়া যায় কি?",
    answer:
      "হ্যাঁ, দান করার সময় উদ্দেশ্য হিসেবে যাকাত, সদকা, মাদ্রাসা খরচ, নির্মাণ কাজ বা এতিম শিক্ষার্থীদের জন্য আলাদাভাবে বেছে নেওয়া যায়।",
  },
  {
    question: "মসজিদে কি ছাত্রাবাসের ব্যবস্থা আছে?",
    answer:
      "দূরবর্তী স্থান থেকে আসা শিক্ষার্থীদের জন্য মসজিদ সংলগ্ন ছাত্রাবাসের ব্যবস্থা রয়েছে। ছাত্রাবাসে থাকা, আসন ও অন্যান্য নিয়ম সম্পর্কে বিস্তারিত জানতে কর্তৃপক্ষের সাথে যোগাযোগ করুন।",
  },
];