
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaPlus,
  FaTrash,
  FaImages,
  FaTimes,
} from "react-icons/fa";

import Loader from "../../components/Loader.jsx";
import { api } from "../../lib/api.js";

export default function AdminGallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] =
    useState("");

  const [saving, setSaving] = useState(false);
  const [deleteItem, setDeleteItem] =
    useState(null);
  const [deleting, setDeleting] =
    useState(false);

  const loadGallery = async () => {
    try {
      const data = await api.get(
        "/gallery"
      );

      setGallery(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const resetForm = () => {
    setImage("");
    setTitle("");
    setCaption("");
  };

  const addImage = async (event) => {
    event.preventDefault();

    if (!image.trim()) {
      toast.error(
        "ছবির URL দিন"
      );
      return;
    }

    setSaving(true);

    try {
      await api.post(
        "/gallery",
        {
          image,
          title,
          caption,
        },
        true
      );

      toast.success(
        "গ্যালারিতে ছবি যোগ হয়েছে"
      );

      resetForm();
      await loadGallery();
    } catch (error) {
      toast.error(error.message);
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
      toast.error(error.message);
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

      
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-indigo-950">
            নতুন ছবি যোগ করুন
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            ছবির URL দিয়ে গ্যালারিতে
            নতুন ছবি যোগ করতে পারবেন।
          </p>
        </div>

        <form
          onSubmit={addImage}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              ছবির URL
            </label>

            <input
              type="url"
              value={image}
              onChange={(event) =>
                setImage(
                  event.target.value
                )
              }
              placeholder="https://example.com/image.jpg"
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
                py-3
                text-sm
                outline-none
                transition
                focus:border-indigo-400
                focus:bg-white
              "
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                ছবির নাম
                <span className="ml-1 text-xs text-slate-400">
                  (ঐচ্ছিক)
                </span>
              </label>

              <input
                type="text"
                value={title}
                onChange={(event) =>
                  setTitle(
                    event.target.value
                  )
                }
                placeholder="যেমন: মসজিদের সামনের দৃশ্য"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:border-indigo-400
                  focus:bg-white
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                সংক্ষিপ্ত বিবরণ
                <span className="ml-1 text-xs text-slate-400">
                  (ঐচ্ছিক)
                </span>
              </label>

              <input
                type="text"
                value={caption}
                onChange={(event) =>
                  setCaption(
                    event.target.value
                  )
                }
                placeholder="ছবির সংক্ষিপ্ত বিবরণ"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:border-indigo-400
                  focus:bg-white
                "
              />
            </div>
          </div>

         
          {image.trim() && (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <img
                src={image}
                alt="Preview"
                className="
                  max-h-72
                  w-full
                  object-contain
                "
                onError={(event) => {
                  event.currentTarget.style.display =
                    "none";
                }}
              />
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
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
                disabled:opacity-60
              "
            >
              <FaPlus />

              {saving
                ? "যোগ হচ্ছে..."
                : "ছবি যোগ করুন"}
            </button>
          </div>
        </form>
      </section>

      
      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-indigo-950">
              গ্যালারির ছবি
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              মোট {gallery.length} টি ছবি
            </p>
          </div>
        </div>

        {gallery.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <FaImages className="mx-auto text-3xl text-slate-300" />

            <p className="mt-4 text-sm text-slate-500">
              এখনও কোনো ছবি যোগ করা হয়নি।
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item) => (
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
                    alt={
                      item.title ||
                      "Gallery image"
                    }
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-4">
                  {item.title && (
                    <h3 className="font-semibold text-indigo-950">
                      {item.title}
                    </h3>
                  )}

                  {item.caption && (
                    <p className="mt-1 text-sm text-slate-500">
                      {item.caption}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      setDeleteItem(item)
                    }
                    className="
                      mt-4
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
            ))}
          </div>
        )}
      </section>

     
      {deleteItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-indigo-950">
                  ছবি মুছে ফেলবেন?
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  এই ছবিটি গ্যালারি থেকে
                  স্থায়ীভাবে মুছে যাবে।
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  !deleting &&
                  setDeleteItem(null)
                }
                className="grid size-9 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
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
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                বাতিল
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={removeImage}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
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

