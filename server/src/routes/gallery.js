
import { Router } from "express";

import {
  protect,
  adminOnly,
} from "../middleware/auth.js";

import {
  getGallery,
  createGallery,
  deleteGallery,
} from "../controllers/galleryController.js";

const router = Router();

router.get(
  "/",
  getGallery
);

router.post(
  "/",
  ...protect,
  adminOnly,
  createGallery
);

router.delete(
  "/:id",
  ...protect,
  adminOnly,
  deleteGallery
);


export default router;

