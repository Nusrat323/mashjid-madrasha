import "dotenv/config";
import mongoose from "mongoose";
import Notice from "../models/Notice.js";


const day = 24 * 60 * 60 * 1000;

const notices = [
  {
    title: "জুমুআর নামাজের সময়সূচি",
    body: "প্রতি শুক্রবার জুমুআর নামাজের জামাত নির্ধারিত সময়ে অনুষ্ঠিত হবে। মুসল্লিদের খুতবা শুরুর আগেই মসজিদে উপস্থিত হওয়ার অনুরোধ করা হলো।",
    category: "jummah",
  },
  {
    title: "মাদ্রাসায় নতুন শিক্ষার্থী ভর্তি চলছে",
    body: "মাদ্রাসার বিভিন্ন বিভাগে নতুন শিক্ষার্থী ভর্তি চলছে। ভর্তি সংক্রান্ত তথ্যের জন্য মসজিদ কমিটির সঙ্গে যোগাযোগ করুন।",
    category: "madrasha",
  },
  {
    title: "মসজিদ সংস্কার কাজে সহযোগিতার আহ্বান",
    body: "মসজিদের সংস্কার ও উন্নয়ন কাজে সামর্থ্য অনুযায়ী দান করে সদকায়ে জারিয়ার অংশীদার হোন।",
    category: "general",
  },
];



await mongoose.connect(process.env.MONGODB_URI);

if ((await Notice.countDocuments()) === 0) await Notice.insertMany(notices);
if ((await Event.countDocuments()) === 0) await Event.insertMany(events);

console.log("Seed complete");
await mongoose.disconnect();
