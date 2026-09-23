import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    donorName: { type: String, required: true, trim: true },
    donorEmail: { type: String, default: "", trim: true },
    phone: { type: String, default: "", trim: true },
    amount: { type: Number, required: true, min: 10 },
    purpose: {
      type: String,
      enum: ["general", "madrasha", "construction", "orphan", "zakat", "sadaqah"],
      default: "general",
    },
    method: { type: String, enum: ["bkash", "nagad", "bank"], required: true },
    senderNumber: { type: String, default: "", trim: true },
    transactionId: { type: String, default: "", trim: true },
    paymentId: { type: String, default: "" },
    status: { type: String, enum: ["pending", "completed", "rejected"], default: "pending" },
    isAnonymous: { type: Boolean, default: false },
    note: { type: String, default: "", trim: true },
  },
  { timestamps: true }
);

donationSchema.index({ createdAt: -1 });
donationSchema.index({ status: 1 });

export default mongoose.model("Donation", donationSchema);
