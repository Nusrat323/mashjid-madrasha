
import Gallery from "../models/Gallery.js";

export const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find()
      .sort({ createdAt: -1 });

    res.json(gallery);
  } catch (error) {
    console.error(
      "Get gallery error:",
      error
    );

    res.status(500).json({
      message:
        "গ্যালারির ছবি লোড করা যায়নি",
    });
  }
};

export const createGallery = async (
  req,
  res
) => {
  try {
    const {
      image,
      title,
      caption,
    } = req.body;

    if (!image?.trim()) {
      return res.status(400).json({
        message:
          "ছবির URL দিতে হবে",
      });
    }

    const gallery = await Gallery.create({
      image: image.trim(),
      title: title?.trim() || "",
      caption: caption?.trim() || "",
    });

    res.status(201).json(gallery);
  } catch (error) {
    console.error(
      "Create gallery error:",
      error
    );

    res.status(500).json({
      message:
        "গ্যালারিতে ছবি যোগ করা যায়নি",
    });
  }
};

export const deleteGallery = async (
  req,
  res
) => {
  try {
    const gallery =
      await Gallery.findById(
        req.params.id
      );

    if (!gallery) {
      return res.status(404).json({
        message:
          "ছবিটি পাওয়া যায়নি",
      });
    }

    await Gallery.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "ছবিটি সফলভাবে মুছে ফেলা হয়েছে",
    });
  } catch (error) {
    console.error(
      "Delete gallery error:",
      error
    );

    res.status(500).json({
      message:
        "ছবিটি মুছে ফেলা যায়নি",
    });
  }
};

