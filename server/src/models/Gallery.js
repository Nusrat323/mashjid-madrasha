
import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      trim: true,
      default: "",
    },

    caption: {
      type: String,
      trim: true,
      default: "",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model(
  "Gallery",
  gallerySchema
);

export default Gallery;

