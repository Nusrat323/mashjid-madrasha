import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaTimes, FaTrash, FaSearch, FaDonate } from "react-icons/fa";
import Loader from "../../components/Loader.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import StatusBadge from "../../components/StatusBadge.jsx";
import { inputClass } from "../../components/Field.jsx";
import { api } from "../../lib/api.js";
import { formatDate, formatNumber, formatTaka, formatTime, methodLabel, purposeLabel } from "../../lib/format.js";
import { methods, purposes, statusMap } from "../../data/site.js";

const initialFilters = { status: "", method: "", purpose: "", from: "", to: "", search: "" };

const iconButton = "grid size-9 place-items-center rounded-lg transition";

export default function AdminDonations() {
  const [filters, setFilters] = useState(initialFilters);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ items: [], total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((current) => ({ ...current, search: searchText }));
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchText]);

  const query = useMemo(() => {
    const params = new URLSearchParams({ page, limit: 12 });
    Object.entries(filters).forEach(([key, value]) => value && params.set(key, value));
    return params.toString();
  }, [filters, page]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setResult(await api.get(`/donations?${query}`, true));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    load();
  }, [load]);

  const changeFilter = (name, value) => {
    setFilters((current) => ({ ...current, [name]: value }));
    setPage(1);
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/donations/${id}/status`, { status }, true);
      toast.success("অবস্থা পরিবর্তন হয়েছে");
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("এই দানের রেকর্ড মুছে ফেলবেন?")) return;
    try {
      await api.remove(`/donations/${id}`, true);
      toast.success("মুছে ফেলা হয়েছে");
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setSearchText("");
    setPage(1);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-indigo-950">দানসমূহ</h1>
        <p className="text-sm text-slate-500">কে কত টাকা, কবে ও কোন মাধ্যমে দান করেছেন তার পূর্ণ তালিকা</p>
      </div>

      <div className="mb-6 grid gap-3 rounded-3xl border border-slate-200 bg-white p-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative sm:col-span-2">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="নাম, ইমেইল, মোবাইল বা ট্রানজেকশন আইডি"
            className={`${inputClass} pl-11`}
          />
        </div>

        <select value={filters.status} onChange={(e) => changeFilter("status", e.target.value)} className={inputClass}>
          <option value="">সব অবস্থা</option>
          {Object.entries(statusMap).map(([value, item]) => (
            <option key={value} value={value}>
              {item.label}
            </option>
          ))}
        </select>

        <select value={filters.method} onChange={(e) => changeFilter("method", e.target.value)} className={inputClass}>
          <option value="">সব মাধ্যম</option>
          {methods.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <select value={filters.purpose} onChange={(e) => changeFilter("purpose", e.target.value)} className={inputClass}>
          <option value="">সব উদ্দেশ্য</option>
          {purposes.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <input type="date" value={filters.from} onChange={(e) => changeFilter("from", e.target.value)} className={inputClass} aria-label="শুরুর তারিখ" />
        <input type="date" value={filters.to} onChange={(e) => changeFilter("to", e.target.value)} className={inputClass} aria-label="শেষ তারিখ" />

        <button onClick={resetFilters} className="rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-600 transition hover:bg-slate-50">
          ফিল্টার মুছুন
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : result.items.length === 0 ? (
        <EmptyState icon={FaDonate} title="কোনো দান পাওয়া যায়নি" text="ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।" />
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-left">
              <thead className="bg-slate-50 text-sm text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-medium">দাতা</th>
                  <th className="px-5 py-4 font-medium">পরিমাণ</th>
                  <th className="px-5 py-4 font-medium">উদ্দেশ্য</th>
                  <th className="px-5 py-4 font-medium">মাধ্যম ও ট্রানজেকশন</th>
                  <th className="px-5 py-4 font-medium">তারিখ</th>
                  <th className="px-5 py-4 font-medium">অবস্থা</th>
                  <th className="px-5 py-4 font-medium">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {result.items.map((item) => (
                  <tr key={item._id} className="align-top">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-indigo-950">
                        {item.donorName}
                        {item.isAnonymous && <span className="ml-2 rounded bg-slate-100 px-2 py-0.5 text-xs font-normal text-slate-500">গোপন</span>}
                      </p>
                      <p className="text-xs text-slate-500">{item.donorEmail}</p>
                      {item.phone && <p className="text-xs text-slate-500">{item.phone}</p>}
                    </td>
                    <td className="px-5 py-4 font-semibold text-indigo-950">{formatTaka(item.amount)}</td>
                    <td className="px-5 py-4 text-sm">{purposeLabel(item.purpose)}</td>
                    <td className="px-5 py-4 text-sm">
                      <p className="font-medium">{methodLabel(item.method)}</p>
                      {item.transactionId && <p className="text-xs text-slate-500">TrxID: {item.transactionId}</p>}
                      {item.senderNumber && <p className="text-xs text-slate-500">প্রেরক: {item.senderNumber}</p>}
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <p>{formatDate(item.createdAt)}</p>
                      <p className="text-xs text-slate-500">{formatTime(item.createdAt)}</p>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        {item.status !== "completed" && (
                          <button onClick={() => updateStatus(item._id, "completed")} title="অনুমোদন করুন" className={`${iconButton} bg-sky-50 text-sky-700 hover:bg-sky-100`}>
                            <FaCheck />
                          </button>
                        )}
                        {item.status !== "rejected" && (
                          <button onClick={() => updateStatus(item._id, "rejected")} title="বাতিল করুন" className={`${iconButton} bg-amber-50 text-amber-700 hover:bg-amber-100`}>
                            <FaTimes />
                          </button>
                        )}
                        <button onClick={() => remove(item._id)} title="মুছুন" className={`${iconButton} bg-rose-50 text-rose-600 hover:bg-rose-100`}>
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-4 text-sm text-slate-600">
            <span>মোট {formatNumber(result.total)} টি রেকর্ড</span>
            <div className="flex items-center gap-3">
              <button
                disabled={page <= 1}
                onClick={() => setPage((current) => current - 1)}
                className="rounded-lg border border-slate-200 px-4 py-2 transition hover:bg-slate-50 disabled:opacity-40"
              >
                আগের
              </button>
              <span>
                {formatNumber(page)} / {formatNumber(result.pages)}
              </span>
              <button
                disabled={page >= result.pages}
                onClick={() => setPage((current) => current + 1)}
                className="rounded-lg border border-slate-200 px-4 py-2 transition hover:bg-slate-50 disabled:opacity-40"
              >
                পরের
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
