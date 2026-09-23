import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    name: { type: String, default: "", trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    photo: { type: String, default: "" },
    phone: { type: String, default: "", trim: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
