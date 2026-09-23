import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  key: { type: String, default: "main", unique: true },
  phone: { type: String, default: "" },
  email: { type: String, default: "" },
  address: { type: String, default: "পাইকপাড়া, কাজীবাড়ী" },
  bkashNumber: { type: String, default: "" },
  nagadNumber: { type: String, default: "" },
  bankName: { type: String, default: "" },
  bankAccountName: { type: String, default: "" },
  bankAccountNumber: { type: String, default: "" },
  bankBranch: { type: String, default: "" },
  prayerTimes: {
    fajr: { type: String, default: "৫:১৫" },
    dhuhr: { type: String, default: "১:১৫" },
    asr: { type: String, default: "৪:৩০" },
    maghrib: { type: String, default: "সূর্যাস্তের পর" },
    isha: { type: String, default: "৮:০০" },
    jummah: { type: String, default: "১:৩০" },
  },
});

settingsSchema.statics.loadMain = async function () {
  const existing = await this.findOne({ key: "main" });
  return existing || this.create({ key: "main" });
};

export default mongoose.model("Settings", settingsSchema);
