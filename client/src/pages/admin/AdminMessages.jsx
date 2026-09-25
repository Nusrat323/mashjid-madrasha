import { useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaTrash, FaInbox, FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import useFetch from "../../hooks/useFetch.js";
import { api } from "../../lib/api.js";
import { formatDate, formatTime } from "../../lib/format.js";

export default function AdminMessages() {
  const { data, loading, reload } = useFetch("/messages", true);

  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const markRead = async (id) => {
    try {
      await api.patch(`/messages/${id}/read`, {}, true);
      reload();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const remove = async () => {
    if (!deleteId) return;

    setDeleting(true);

    try {
      await api.remove(`/messages/${deleteId}`, true);
      toast.success("মুছে ফেলা হয়েছে");
      setDeleteId(null);
      reload();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-indigo-950">
          বার্তা
        </h1>
        <p className="text-sm text-slate-500">
          যোগাযোগ ফর্ম থেকে আসা বার্তাসমূহ
        </p>
      </div>

      {loading || !data ? (
        <Loader />
      ) : data.length === 0 ? (
        <EmptyState
          icon={FaInbox}
          title="কোনো বার্তা নেই"
          text="কেউ যোগাযোগ ফর্মে বার্তা পাঠালে এখানে দেখা যাবে।"
        />
      ) : (
        <div className="space-y-3">
          {data.map((item) => (
            <div
              key={item._id}
              className={`rounded-2xl border p-5 ${
                item.isRead
                  ? "border-slate-200 bg-white"
                  : "border-indigo-200 bg-indigo-50/50"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-indigo-950">
                    {item.name}
                    {!item.isRead && (
                      <span className="ml-2 rounded-full bg-amber-400 px-2 py-0.5 text-xs font-semibold text-indigo-950">
                        নতুন
                      </span>
                    )}
                  </p>

                  <p className="text-sm text-slate-500">
                    {[item.phone, item.email].filter(Boolean).join(" • ")}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">
                    {formatDate(item.createdAt)}, {formatTime(item.createdAt)}
                  </span>

                  {!item.isRead && (
                    <button
                      onClick={() => markRead(item._id)}
                      title="পঠিত হিসেবে চিহ্নিত করুন"
                      className="grid size-9 place-items-center rounded-lg bg-sky-50 text-sky-700 transition hover:bg-sky-100"
                    >
                      <FaCheck />
                    </button>
                  )}

                  <button
                    onClick={() => setDeleteId(item._id)}
                    title="মুছুন"
                    className="grid size-9 place-items-center rounded-lg bg-rose-50 text-rose-600 transition hover:bg-rose-100"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              <p className="mt-3 whitespace-pre-line text-slate-700">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-indigo-950/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-rose-50 text-lg text-rose-600">
                  <FaTrash />
                </div>

                <div>
                  <h2 className="font-display text-xl font-bold text-indigo-950">
                    বার্তা মুছে ফেলবেন?
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    এই বার্তাটি স্থায়ীভাবে মুছে যাবে।
                  </p>
                </div>
              </div>

              <button
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="grid size-9 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
                title="বন্ধ করুন"
              >
                <FaTimes />
              </button>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                বাতিল
              </button>

              <button
                type="button"
                onClick={remove}
                disabled={deleting}
                className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-3 font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaTrash />
                {deleting ? "মুছে ফেলা হচ্ছে..." : "মুছে ফেলুন"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}