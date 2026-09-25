
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FaCheck,
  FaTimes,
  FaTrash,
  FaSearch,
  FaDonate,
} from "react-icons/fa";

import Loader from "../../components/Loader.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import StatusBadge from "../../components/StatusBadge.jsx";
import { inputClass } from "../../components/Field.jsx";
import { api } from "../../lib/api.js";
import {
  formatDate,
  formatNumber,
  formatTaka,
  formatTime,
  methodLabel,
  purposeLabel,
} from "../../lib/format.js";
import { methods, purposes, statusMap } from "../../data/site.js";

const initialFilters = {
  status: "",
  method: "",
  purpose: "",
  from: "",
  to: "",
  search: "",
};

const iconButton =
  "grid size-9 place-items-center rounded-lg transition";

export default function AdminDonations() {
  const [filters, setFilters] = useState(initialFilters);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  const [result, setResult] = useState({
    items: [],
    total: 0,
    pages: 1,
  });

  const [loading, setLoading] = useState(true);

  // Delete modal
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((current) => ({
        ...current,
        search: searchText,
      }));

      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchText]);

  const query = useMemo(() => {
    const params = new URLSearchParams({
      page,
      limit: 12,
    });

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    return params.toString();
  }, [filters, page]);

  const load = useCallback(async () => {
    setLoading(true);

    try {
      setResult(
        await api.get(`/donations?${query}`, true)
      );
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
    setFilters((current) => ({
      ...current,
      [name]: value,
    }));

    setPage(1);
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(
        `/donations/${id}/status`,
        { status },
        true
      );

      toast.success("অবস্থা পরিবর্তন হয়েছে");
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const openDeleteModal = (item) => {
    setDeleteItem(item);
  };

  const closeDeleteModal = () => {
    if (deleting) return;

    setDeleteItem(null);
  };

  const remove = async () => {
    if (!deleteItem) return;

    setDeleting(true);

    try {
      await api.remove(
        `/donations/${deleteItem._id}`,
        true
      );

      toast.success("দানের রেকর্ড মুছে ফেলা হয়েছে");

      setDeleteItem(null);
      load();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setSearchText("");
    setPage(1);
  };

  return (
    <>
      <div>
        {/* Header */}

        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-600">
            দানের ব্যবস্থাপনা
          </p>

          <h1 className="mt-1 font-display text-2xl font-bold text-indigo-950">
            দানসমূহ
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            দানের রেকর্ড, পরিমাণ, মাধ্যম ও বর্তমান অবস্থা
            এক জায়গা থেকে পরিচালনা করুন
          </p>
        </div>

        {/* Filters */}

        <div className="mb-6 border border-slate-200 bg-white p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Search */}

            <div className="relative sm:col-span-2">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                value={searchText}
                onChange={(e) =>
                  setSearchText(e.target.value)
                }
                placeholder="নাম, ইমেইল, মোবাইল বা ট্রানজেকশন আইডি"
                className={`${inputClass} pl-11`}
              />
            </div>

            {/* Status */}

            <select
              value={filters.status}
              onChange={(e) =>
                changeFilter(
                  "status",
                  e.target.value
                )
              }
              className={inputClass}
            >
              <option value="">সব অবস্থা</option>

              {Object.entries(statusMap).map(
                ([value, item]) => (
                  <option
                    key={value}
                    value={value}
                  >
                    {item.label}
                  </option>
                )
              )}
            </select>

            {/* Method */}

            <select
              value={filters.method}
              onChange={(e) =>
                changeFilter(
                  "method",
                  e.target.value
                )
              }
              className={inputClass}
            >
              <option value="">সব মাধ্যম</option>

              {methods.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>

            {/* Purpose */}

            <select
              value={filters.purpose}
              onChange={(e) =>
                changeFilter(
                  "purpose",
                  e.target.value
                )
              }
              className={inputClass}
            >
              <option value="">সব উদ্দেশ্য</option>

              {purposes.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>

            {/* Start date */}

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-500">
                শুরুর তারিখ
              </label>

              <input
                type="date"
                value={filters.from}
                onChange={(e) =>
                  changeFilter(
                    "from",
                    e.target.value
                  )
                }
                className={inputClass}
              />
            </div>

            {/* End date */}

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-500">
                শেষ তারিখ
              </label>

              <input
                type="date"
                value={filters.to}
                onChange={(e) =>
                  changeFilter(
                    "to",
                    e.target.value
                  )
                }
                className={inputClass}
              />
            </div>

            {/* Reset */}

            <button
              onClick={resetFilters}
              className="self-end border border-slate-200 px-4 py-3 font-medium text-slate-600 transition hover:bg-slate-50"
            >
              ফিল্টার মুছুন
            </button>
          </div>
        </div>

        {/* Results */}

        {loading ? (
          <Loader />
        ) : result.items.length === 0 ? (
          <EmptyState
            icon={FaDonate}
            title="কোনো দান পাওয়া যায়নি"
            text="ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।"
          />
        ) : (
          <div className="overflow-hidden border border-slate-200 bg-white">

            <div className="overflow-x-auto">
              <table className="w-full min-w-[960px] text-left">

                <thead className="border-b border-slate-100 bg-slate-50/70 text-sm text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-medium">
                      দাতা
                    </th>

                    <th className="px-5 py-4 font-medium">
                      পরিমাণ
                    </th>

                    <th className="px-5 py-4 font-medium">
                      উদ্দেশ্য
                    </th>

                    <th className="px-5 py-4 font-medium">
                      মাধ্যম ও ট্রানজেকশন
                    </th>

                    <th className="px-5 py-4 font-medium">
                      তারিখ
                    </th>

                    <th className="px-5 py-4 font-medium">
                      অবস্থা
                    </th>

                    <th className="px-5 py-4 font-medium">
                      অ্যাকশন
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {result.items.map((item) => (
                    <tr
                      key={item._id}
                      className="align-top transition-colors hover:bg-slate-50/50"
                    >
                      {/* Donor */}

                      <td className="px-5 py-4">
                        <p className="font-semibold text-indigo-950">
                          {item.donorName}
                        </p>

                        <p className="text-xs text-slate-500">
                          {item.donorEmail}
                        </p>

                        {item.phone && (
                          <p className="text-xs text-slate-500">
                            {item.phone}
                          </p>
                        )}
                      </td>

                      {/* Amount */}

                      <td className="px-5 py-4 font-semibold text-indigo-950">
                        {formatTaka(item.amount)}
                      </td>

                      {/* Purpose */}

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {purposeLabel(item.purpose)}
                      </td>

                      {/* Payment */}

                      <td className="px-5 py-4 text-sm">
                        <p className="font-medium text-slate-700">
                          {methodLabel(item.method)}
                        </p>

                        {item.transactionId && (
                          <p className="mt-1 text-xs text-slate-500">
                            ট্রানজেকশন:{" "}
                            {item.transactionId}
                          </p>
                        )}

                        {item.senderNumber && (
                          <p className="text-xs text-slate-500">
                            প্রেরক:{" "}
                            {item.senderNumber}
                          </p>
                        )}
                      </td>

                      {/* Date */}

                      <td className="px-5 py-4 text-sm">
                        <p className="text-slate-600">
                          {formatDate(item.createdAt)}
                        </p>

                        <p className="text-xs text-slate-500">
                          {formatTime(item.createdAt)}
                        </p>
                      </td>

                      {/* Status */}

                      <td className="px-5 py-4">
                        <StatusBadge
                          status={item.status}
                        />
                      </td>

                      {/* Actions */}

                      <td className="px-5 py-4">
                        {item.status === "pending" ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                updateStatus(
                                  item._id,
                                  "completed"
                                )
                              }
                              title="অনুমোদন করুন"
                              className={`${iconButton} bg-emerald-50 text-emerald-700 hover:bg-emerald-100`}
                            >
                              <FaCheck />
                            </button>

                            <button
                              onClick={() =>
                                updateStatus(
                                  item._id,
                                  "rejected"
                                )
                              }
                              title="বাতিল করুন"
                              className={`${iconButton} bg-amber-50 text-amber-700 hover:bg-amber-100`}
                            >
                              <FaTimes />
                            </button>

                            <button
                              onClick={() =>
                                openDeleteModal(item)
                              }
                              title="মুছুন"
                              className={`${iconButton} bg-rose-50 text-rose-600 hover:bg-rose-100`}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              openDeleteModal(item)
                            }
                            title="মুছুন"
                            className={`${iconButton} bg-rose-50 text-rose-600 hover:bg-rose-100`}
                          >
                            <FaTrash />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-4 text-sm text-slate-600">
              <span>
                মোট {formatNumber(result.total)} টি রেকর্ড
              </span>

              <div className="flex items-center gap-3">
                <button
                  disabled={page <= 1}
                  onClick={() =>
                    setPage(
                      (current) => current - 1
                    )
                  }
                  className="border border-slate-200 px-4 py-2 transition hover:bg-slate-50 disabled:opacity-40"
                >
                  আগের
                </button>

                <span>
                  {formatNumber(page)} /{" "}
                  {formatNumber(result.pages)}
                </span>

                <button
                  disabled={
                    page >= result.pages
                  }
                  onClick={() =>
                    setPage(
                      (current) => current + 1
                    )
                  }
                  className="border border-slate-200 px-4 py-2 transition hover:bg-slate-50 disabled:opacity-40"
                >
                  পরের
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}

      {deleteItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-[2px]"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeDeleteModal();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            className="w-full max-w-md border border-slate-200 bg-white shadow-2xl"
          >
            <div className="px-6 pb-5 pt-6">
              <div className="flex items-start gap-4">
                <div className="grid size-11 shrink-0 place-items-center rounded-full bg-rose-50 text-rose-600">
                  <FaTrash />
                </div>

                <div>
                  <h2
                    id="delete-title"
                    className="font-display text-lg font-bold text-indigo-950"
                  >
                    দানের রেকর্ড মুছে ফেলবেন?
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    এই রেকর্ডটি মুছে দিলে এটি আর দানের
                    তালিকায় থাকবে না। এই কাজটি পরে ফিরিয়ে
                    আনা যাবে না।
                  </p>
                </div>
              </div>

              <div className="mt-5 border border-slate-100 bg-slate-50 px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-slate-500">
                    দাতা
                  </span>

                  <span className="text-sm font-semibold text-indigo-950">
                    {deleteItem.donorName}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between gap-4">
                  <span className="text-sm text-slate-500">
                    পরিমাণ
                  </span>

                  <span className="text-sm font-semibold text-indigo-950">
                    {formatTaka(deleteItem.amount)}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between gap-4">
                  <span className="text-sm text-slate-500">
                    অবস্থা
                  </span>

                  <StatusBadge
                    status={deleteItem.status}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={deleting}
                className="border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                বাতিল করুন
              </button>

              <button
                type="button"
                onClick={remove}
                disabled={deleting}
                className="flex items-center gap-2 bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaTrash className="text-xs" />

                {deleting
                  ? "মুছে ফেলা হচ্ছে..."
                  : "মুছে ফেলুন"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

