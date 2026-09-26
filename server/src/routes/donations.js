import { Router } from "express";

import {
  protect,
  adminOnly,
} from "../middleware/auth.js";

import {
  createManualDonation,
  startBkashPayment,
  bkashCallback,
  getMyDonations,
  getRecentDonations,
  getPublicStats,
  getAllDonations,
  updateDonationStatus,
  deleteDonation,
  deleteMyDonation,
} from "../controllers/donationController.js";

const router = Router();

router.get(
  "/recent",
  getRecentDonations
);

router.get(
  "/stats",
  getPublicStats
);

router.get(
  "/bkash/callback",
  bkashCallback
);

router.get(
  "/mine",
  ...protect,
  getMyDonations
);

router.post(
  "/",
  ...protect,
  createManualDonation
);

router.post(
  "/bkash",
  ...protect,
  startBkashPayment
);

router.delete(
  "/mine/:id",
  ...protect,
  deleteMyDonation
);

router.get(
  "/",
  ...protect,
  adminOnly,
  getAllDonations
);

router.patch(
  "/:id/status",
  ...protect,
  adminOnly,
  updateDonationStatus
);

router.delete(
  "/:id",
  ...protect,
  adminOnly,
  deleteDonation
);

export default router;