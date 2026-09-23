import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
    category: { type: String, enum: ["general", "madrasha", "jummah", "urgent"], default: "general" },
  },
  { timestamps: true }
);

export default mongoose.model("Notice", noticeSchema);
