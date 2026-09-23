import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    date: { type: Date, required: true },
    time: { type: String, default: "", trim: true },
    place: { type: String, default: "", trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
