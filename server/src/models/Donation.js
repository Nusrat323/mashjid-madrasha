import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    donorName: {
      type: String,
      required: true,
    },

    donorEmail: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    purpose: {
      type: String,
      required: true,
    },

    method: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },

    senderNumber: {
      type: String,
    },

    transactionId: {
      type: String,
    },

    paymentId: {
      type: String,
    },

    isAnonymous: {
      type: Boolean,
      default: false,
    },

    note: {
      type: String,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "completed",
        "rejected",
      ],
      default: "pending",
    },

    userDeleted: {
      type: Boolean,
      default: false,
    },

    adminDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Donation",
  donationSchema
);