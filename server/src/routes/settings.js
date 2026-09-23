import { Router } from "express";
import Settings from "../models/Settings.js";
import { protect, adminOnly } from "../middleware/auth.js";
import { isBkashConfigured } from "../services/bkash.js";

const router = Router();

router.get("/", async (req, res) => {
  const settings = await Settings.loadMain();
  res.json({ ...settings.toObject(), bkashGateway: isBkashConfigured() });
});

router.put("/", ...protect, adminOnly, async (req, res) => {
  const { _id, __v, key, bkashGateway, ...data } = req.body;

  const settings = await Settings.loadMain();
  settings.set(data);
  await settings.save();

  res.json(settings);
});

export default router;
