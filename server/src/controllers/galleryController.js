
import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";

export const getGallery = async (
  req,
  res
) => {
  try {
    const gallery =
      await Gallery.find().sort({
        createdAt: -1,
      });

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
    if (!req.file) {
      return res.status(400).json({
        message:
          "একটি ছবি নির্বাচন করুন",
      });
    }

    const file = req.file;

    const uploadResult =
      await new Promise(
        (resolve, reject) => {
          const uploadStream =
            cloudinary.uploader.upload_stream(
              {
                folder:
                  "kazibari-mashjid/gallery",

                resource_type: "image",
              },

              (error, result) => {
                if (error) {
                  reject(error);
                  return;
                }

                resolve(result);
              }
            );

          uploadStream.end(
            file.buffer
          );
        }
      );

    const gallery =
      await Gallery.create({
        image:
          uploadResult.secure_url,

        publicId:
          uploadResult.public_id,
      });

    res.status(201).json(gallery);
  } catch (error) {
    console.error(
      "Create gallery error:",
      error
    );

    res.status(500).json({
      message:
        "গ্যালারিতে ছবি আপলোড করা যায়নি",
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

    /*
      First delete the actual image
      from Cloudinary.
    */
    try {
      if (gallery.publicId) {
        await cloudinary.uploader.destroy(
          gallery.publicId,
          {
            resource_type: "image",
          }
        );
      }
    } catch (cloudinaryError) {
      console.error(
        "Cloudinary delete error:",
        cloudinaryError
      );
    }

    /*
      Then delete the MongoDB record.
    */
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



