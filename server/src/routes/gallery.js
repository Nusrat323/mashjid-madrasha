
import { Router } from "express";
import multer from "multer";

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


const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize:
      5 * 1024 * 1024,
  },

  fileFilter: (
    req,
    file,
    cb
  ) => {
    if (
      file.mimetype.startsWith(
        "image/"
      )
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "শুধু ছবি আপলোড করা যাবে"
        )
      );
    }
  },
});

router.get(
  "/",
  getGallery
);

router.post(
  "/",
  ...protect,
  adminOnly,
  upload.single("image"),
  createGallery
);

router.delete(
  "/:id",
  ...protect,
  adminOnly,
  deleteGallery
);

export default router;


