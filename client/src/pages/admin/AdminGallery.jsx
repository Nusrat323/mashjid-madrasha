
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaPlus,
  FaTrash,
  FaImages,
  FaTimes,
  FaUpload,
} from "react-icons/fa";

import Loader from "../../components/Loader.jsx";
import { api } from "../../lib/api.js";
import { auth } from "../../firebase.js";

export default function AdminGallery() {
  const [gallery, setGallery] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [deleteItem, setDeleteItem] =
    useState(null);

  const [deleting, setDeleting] =
    useState(false);

  const loadGallery = async () => {
    try {
      const data =
        await api.get("/gallery");

      setGallery(data);
    } catch (error) {
      toast.error(
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(
          preview
        );
      }
    };
  }, [preview]);

  const handleImageChange = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      toast.error(
        "শুধু ছবি নির্বাচন করুন"
      );

      event.target.value = "";

      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      toast.error(
        "ছবির সাইজ ৫ MB-এর বেশি হতে পারবে না"
      );

      event.target.value = "";

      return;
    }

    if (preview) {
      URL.revokeObjectURL(
        preview
      );
    }

    setImage(file);

    setPreview(
      URL.createObjectURL(file)
    );
  };

  const resetForm = () => {
    if (preview) {
      URL.revokeObjectURL(
        preview
      );
    }

    setImage(null);
    setPreview("");

    const input =
      document.getElementById(
        "gallery-image"
      );

    if (input) {
      input.value = "";
    }
  };

  const addImage = async (
    event
  ) => {
    event.preventDefault();

    if (!image) {
      toast.error(
        "একটি ছবি নির্বাচন করুন"
      );

      return;
    }

    setSaving(true);

    try {
      const currentUser =
        auth.currentUser;

      if (!currentUser) {
        throw new Error(
          "লগইন করা প্রয়োজন"
        );
      }

      const token =
        await currentUser.getIdToken();

      const formData =
        new FormData();

      formData.append(
        "image",
        image
      );

      const apiUrl =
        import.meta.env
          .VITE_API_URL;

      const response =
        await fetch(
          `${apiUrl}/gallery`,
          {
            method: "POST",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },

            body: formData,
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "ছবি আপলোড করা যায়নি"
        );
      }

      toast.success(
        "গ্যালারিতে ছবি যোগ হয়েছে"
      );

      resetForm();

      await loadGallery();
    } catch (error) {
      console.error(
        "Gallery upload error:",
        error
      );

      toast.error(
        error.message ||
          "ছবি আপলোড করা যায়নি"
      );
    } finally {
      setSaving(false);
    }
  };

  const removeImage = async () => {
    if (!deleteItem) return;

    setDeleting(true);

    try {
      await api.remove(
        `/gallery/${deleteItem._id}`,
        true
      );

      toast.success(
        "ছবি মুছে ফেলা হয়েছে"
      );

      setDeleteItem(null);

      await loadGallery();
    } catch (error) {
      toast.error(
        error.message
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-xl bg-indigo-50 text-indigo-900">
            <FaImages />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-indigo-950">
              গ্যালারি
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              মসজিদ ও মাদ্রাসার ছবি
              পরিচালনা করুন
            </p>
          </div>
        </div>
      </div>

      {/* Upload */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-indigo-950">
            নতুন ছবি যোগ করুন
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            আপনার ডিভাইস থেকে ছবি
            নির্বাচন করে গ্যালারিতে
            যোগ করুন।
          </p>
        </div>

        <form
          onSubmit={addImage}
          className="space-y-5"
        >
          <label
            htmlFor="gallery-image"
            className="
              flex
              min-h-52
              cursor-pointer
              flex-col
              items-center
              justify-center
              border-2
              border-dashed
              border-slate-300
              bg-slate-50
              px-5
              py-8
              text-center
              transition
              hover:border-indigo-400
              hover:bg-indigo-50/40
            "
          >
            {preview ? (
              <div className="w-full">
                <div className="mx-auto max-h-72 max-w-xl overflow-hidden bg-white">
                  <img
                    src={preview}
                    alt="নির্বাচিত ছবি"
                    className="
                      mx-auto
                      max-h-72
                      w-full
                      object-contain
                    "
                  />
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-indigo-800">
                  <FaUpload />
                  অন্য ছবি নির্বাচন করুন
                </div>
              </div>
            ) : (
              <>
                <div className="grid size-14 place-items-center rounded-full bg-indigo-100 text-xl text-indigo-800">
                  <FaUpload />
                </div>

                <p className="mt-4 text-sm font-semibold text-slate-700">
                  ছবি নির্বাচন করুন
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  সর্বোচ্চ ৫ MB
                </p>
              </>
            )}

            <input
              id="gallery-image"
              type="file"
              accept="image/*"
              onChange={
                handleImageChange
              }
              className="sr-only"
            />
          </label>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={
                saving || !image
              }
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-indigo-950
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-indigo-900
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <FaPlus />

              {saving
                ? "আপলোড হচ্ছে..."
                : "ছবি যোগ করুন"}
            </button>
          </div>
        </form>
      </section>

      {/* Gallery */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-indigo-950">
              গ্যালারির ছবি
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              মোট{" "}
              {new Intl.NumberFormat(
                "bn-BD"
              ).format(
                gallery.length
              )}{" "}
              টি ছবি
            </p>
          </div>
        </div>

        {gallery.length === 0 ? (
          <div className="border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <FaImages className="mx-auto text-3xl text-slate-300" />

            <p className="mt-4 text-sm text-slate-500">
              এখনও কোনো ছবি যোগ করা হয়নি।
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map(
              (item) => (
                <div
                  key={item._id}
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    shadow-sm
                  "
                >
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt="গ্যালারির ছবি"
                      className="
                        h-full
                        w-full
                        object-cover
                        transition
                        duration-500
                        hover:scale-105
                      "
                    />
                  </div>

                  <div className="p-4">
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteItem(
                          item
                        )
                      }
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-lg
                        border
                        border-red-100
                        px-3
                        py-2
                        text-sm
                        font-medium
                        text-red-600
                        transition
                        hover:bg-red-50
                      "
                    >
                      <FaTrash />
                      মুছে ফেলুন
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </section>

      {/* Delete modal */}
      {deleteItem && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/40
            p-4
          "
          onClick={() =>
            !deleting &&
            setDeleteItem(null)
          }
        >
          <div
            className="
              w-full
              max-w-md
              rounded-2xl
              bg-white
              p-6
              shadow-2xl
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-indigo-950">
                  ছবি মুছে ফেলবেন?
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  এই ছবিটি গ্যালারি
                  থেকে স্থায়ীভাবে
                  মুছে যাবে।
                </p>
              </div>

              <button
                type="button"
                disabled={deleting}
                onClick={() =>
                  setDeleteItem(null)
                }
                className="
                  grid
                  size-9
                  place-items-center
                  rounded-lg
                  text-slate-400
                  transition
                  hover:bg-slate-100
                  hover:text-slate-700
                "
              >
                <FaTimes />
              </button>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() =>
                  setDeleteItem(null)
                }
                className="
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-slate-700
                  transition
                  hover:bg-slate-50
                "
              >
                বাতিল
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={
                  removeImage
                }
                className="
                  rounded-xl
                  bg-red-600
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-red-700
                  disabled:opacity-60
                "
              >
                {deleting
                  ? "মুছে যাচ্ছে..."
                  : "মুছে ফেলুন"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


