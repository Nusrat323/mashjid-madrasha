import { Router } from "express";
import Message from "../models/Message.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = Router();

router.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name?.trim() || !message?.trim()) {
    return res.status(400).json({ message: "নাম ও বার্তা লিখুন" });
  }

  await Message.create({ name, email, phone, message });
  res.status(201).json({ message: "আপনার বার্তা পাঠানো হয়েছে" });
});

router.get("/", ...protect, adminOnly, async (req, res) => {
  res.json(await Message.find().sort({ createdAt: -1 }));
});

router.patch("/:id/read", ...protect, adminOnly, async (req, res) => {
  const message = await Message.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
  res.json(message);
});

router.delete("/:id", ...protect, adminOnly, async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ message: "মুছে ফেলা হয়েছে" });
});

export default router;
