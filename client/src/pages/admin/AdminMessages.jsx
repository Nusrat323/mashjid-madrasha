import toast from "react-hot-toast";
import { FaCheck, FaTrash, FaInbox } from "react-icons/fa";
import Loader from "../../components/Loader.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import useFetch from "../../hooks/useFetch.js";
import { api } from "../../lib/api.js";
import { formatDate, formatTime } from "../../lib/format.js";

export default function AdminMessages() {
  const { data, loading, reload } = useFetch("/messages", true);

  const markRead = async (id) => {
    try {
      await api.patch(`/messages/${id}/read`, {}, true);
      reload();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("বার্তাটি মুছে ফেলবেন?")) return;
    try {
      await api.remove(`/messages/${id}`, true);
      toast.success("মুছে ফেলা হয়েছে");
      reload();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-indigo-950">বার্তা</h1>
        <p className="text-sm text-slate-500">যোগাযোগ ফর্ম থেকে আসা বার্তাসমূহ</p>
      </div>

      {loading || !data ? (
        <Loader />
      ) : data.length === 0 ? (
        <EmptyState icon={FaInbox} title="কোনো বার্তা নেই" text="কেউ যোগাযোগ ফর্মে বার্তা পাঠালে এখানে দেখা যাবে।" />
      ) : (
        <div className="space-y-3">
          {data.map((item) => (
            <div
              key={item._id}
              className={`rounded-2xl border p-5 ${item.isRead ? "border-slate-200 bg-white" : "border-indigo-200 bg-indigo-50/50"}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-indigo-950">
                    {item.name}
                    {!item.isRead && <span className="ml-2 rounded-full bg-amber-400 px-2 py-0.5 text-xs font-semibold text-indigo-950">নতুন</span>}
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
                    <button onClick={() => markRead(item._id)} title="পঠিত হিসেবে চিহ্নিত করুন" className="grid size-9 place-items-center rounded-lg bg-sky-50 text-sky-700 transition hover:bg-sky-100">
                      <FaCheck />
                    </button>
                  )}
                  <button onClick={() => remove(item._id)} title="মুছুন" className="grid size-9 place-items-center rounded-lg bg-rose-50 text-rose-600 transition hover:bg-rose-100">
                    <FaTrash />
                  </button>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-line text-slate-700">{item.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
