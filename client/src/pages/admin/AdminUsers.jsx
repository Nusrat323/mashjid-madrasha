
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import {
  FaSearch,
  FaTrash,
  FaUsers,
} from "react-icons/fa";

import Loader from "../../components/Loader.jsx";
import EmptyState from "../../components/EmptyState.jsx";

import useFetch from "../../hooks/useFetch.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { api } from "../../lib/api.js";

import {
  formatDate,
  formatNumber,
} from "../../lib/format.js";


export default function AdminUsers() {
  const { user: currentUser } = useAuth();

  const {
    data,
    loading,
    reload,
  } = useFetch("/users", true);

  const [search, setSearch] = useState("");

  const [deleteItem, setDeleteItem] =
    useState(null);

  const [deleting, setDeleting] =
    useState(false);


  /*
    ADMIN_EMAIL
  */
  const adminEmail =
    import.meta.env.VITE_ADMIN_EMAIL
      ?.trim()
      .toLowerCase();


  /*
    Search filter
  */
  const filteredUsers = useMemo(() => {
    if (!data) return [];

    const value =
      search.trim().toLowerCase();

    if (!value) {
      return data;
    }

    return data.filter((item) => {
      const name =
        item.name?.toLowerCase() || "";

      const email =
        item.email?.toLowerCase() || "";

      const phone =
        item.phone?.toLowerCase() || "";

      return (
        name.includes(value) ||
        email.includes(value) ||
        phone.includes(value)
      );
    });
  }, [data, search]);


  /*
    Check if this is current logged-in user
  */
  const isCurrentUser = (item) => {
    return (
      item._id === currentUser?._id
    );
  };


  /*
    Check if this is main admin
  */
  const isMainAdmin = (item) => {
    return (
      adminEmail &&
      item.email?.trim().toLowerCase() ===
        adminEmail
    );
  };


  /*
    Open delete modal
  */
  const openDeleteModal = (item) => {
    if (isCurrentUser(item)) {
      toast.error(
        "নিজের অ্যাকাউন্ট মুছে ফেলা যাবে না"
      );

      return;
    }

    if (isMainAdmin(item)) {
      toast.error(
        "প্রধান অ্যাডমিনের অ্যাকাউন্ট মুছে ফেলা যাবে না"
      );

      return;
    }

    setDeleteItem(item);
  };


  /*
    Close delete modal
  */
  const closeDeleteModal = () => {
    if (deleting) return;

    setDeleteItem(null);
  };


  /*
    Delete user
  */
  const removeUser = async () => {
    if (!deleteItem) return;

    setDeleting(true);

    try {
      await api.remove(
        `/users/${deleteItem._id}`,
        true
      );

      toast.success(
        "ব্যবহারকারী মুছে ফেলা হয়েছে"
      );

      setDeleteItem(null);

      await reload();
    } catch (err) {
      toast.error(
        err.message ||
          "ব্যবহারকারী মুছে ফেলা যায়নি"
      );
    } finally {
      setDeleting(false);
    }
  };


  /*
    Loading
  */
  if (loading || !data) {
    return <Loader />;
  }


  return (
    <>
      <div>

        {/* Header */}

        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-600">
            ব্যবহারকারী ব্যবস্থাপনা
          </p>

          <h1 className="mt-1 font-display text-2xl font-bold text-indigo-950">
            ব্যবহারকারী
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            মোট{" "}
            {formatNumber(data.length)} জন
            নিবন্ধিত ব্যবহারকারী
          </p>
        </div>


        {/* Search */}

        <div className="mb-6 border border-slate-200 bg-white p-5">

          <div className="relative max-w-xl">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="নাম, ইমেইল বা মোবাইল দিয়ে খুঁজুন"
              className="w-full border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>


          <div className="mt-3 text-xs text-slate-400">

            {search.trim()
              ? `${formatNumber(
                  filteredUsers.length
                )} জন ব্যবহারকারী পাওয়া গেছে`
              : `মোট ${formatNumber(
                  data.length
                )} জন ব্যবহারকারী`}

          </div>

        </div>


        {/* Empty */}

        {filteredUsers.length === 0 ? (

          <EmptyState
            icon={FaUsers}
            title="কোনো ব্যবহারকারী পাওয়া যায়নি"
            text={
              search.trim()
                ? "অন্য কোনো নাম, ইমেইল বা মোবাইল নম্বর দিয়ে চেষ্টা করুন।"
                : "এখনো কোনো ব্যবহারকারী নিবন্ধিত হয়নি।"
            }
          />

        ) : (

          /* Table */

          <div className="overflow-hidden border border-slate-200 bg-white">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[780px] text-left">

                <thead className="border-b border-slate-100 bg-slate-50/70">

                  <tr>

                    <th className="px-5 py-4 text-sm font-medium text-slate-500">
                      ব্যবহারকারী
                    </th>

                    <th className="px-5 py-4 text-sm font-medium text-slate-500">
                      মোবাইল
                    </th>

                    <th className="px-5 py-4 text-sm font-medium text-slate-500">
                      যোগদান
                    </th>

                    <th className="px-5 py-4 text-sm font-medium text-slate-500">
                      ভূমিকা
                    </th>

                    <th className="px-5 py-4 text-sm font-medium text-slate-500">
                      অ্যাকশন
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-slate-100">

                  {filteredUsers.map((item) => {

                    const current =
                      isCurrentUser(item);

                    const mainAdmin =
                      isMainAdmin(item);

                    return (

                      <tr
                        key={item._id}
                        className="transition-colors hover:bg-slate-50/50"
                      >

                        {/* User */}

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-3">

                            {item.photo ? (

                              <img
                                src={item.photo}
                                alt=""
                                referrerPolicy="no-referrer"
                                className="size-10 rounded-full object-cover"
                              />

                            ) : (

                              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-indigo-900 font-semibold text-white">

                                {(
                                  item.name ||
                                  item.email ||
                                  "U"
                                )
                                  .charAt(0)
                                  .toUpperCase()}

                              </span>

                            )}


                            <div className="min-w-0">

                              <p className="truncate font-semibold text-indigo-950">
                                {item.name ||
                                  "নামহীন"}
                              </p>

                              <p className="truncate text-xs text-slate-500">
                                {item.email}
                              </p>

                            </div>

                          </div>

                        </td>


                        {/* Phone */}

                        <td className="px-5 py-4 text-sm text-slate-600">

                          {item.phone || "—"}

                        </td>


                        {/* Joined */}

                        <td className="px-5 py-4 text-sm text-slate-600">

                          {formatDate(
                            item.createdAt
                          )}

                        </td>


                        {/* Role */}

                        <td className="px-5 py-4">

                          {item.role === "admin" ? (

                            <span className="inline-flex items-center border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700">
                              অ্যাডমিন
                            </span>

                          ) : (

                            <span className="inline-flex items-center border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600">
                              সাধারণ ব্যবহারকারী
                            </span>

                          )}


                          {mainAdmin && (

                            <p className="mt-1 text-[11px] text-indigo-500">
                              প্রধান অ্যাডমিন
                            </p>

                          )}


                          {current && !mainAdmin && (

                            <p className="mt-1 text-[11px] text-slate-400">
                              আপনার অ্যাকাউন্ট
                            </p>

                          )}

                        </td>


                        {/* Delete */}

                        <td className="px-5 py-4">

                          <button
                            type="button"
                            onClick={() =>
                              openDeleteModal(item)
                            }
                            disabled={
                              current ||
                              mainAdmin
                            }
                            title={
                              current
                                ? "নিজের অ্যাকাউন্ট মুছতে পারবেন না"
                                : mainAdmin
                                ? "প্রধান অ্যাডমিনের অ্যাকাউন্ট মুছতে পারবেন না"
                                : "ব্যবহারকারী মুছুন"
                            }
                            className="grid size-9 place-items-center bg-rose-50 text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-35"
                          >

                            <FaTrash className="text-sm" />

                          </button>

                        </td>

                      </tr>

                    );
                  })}

                </tbody>

              </table>

            </div>


            {/* Footer */}

            <div className="border-t border-slate-100 px-5 py-4 text-sm text-slate-500">

              {search.trim() ? (

                <span>
                  {formatNumber(
                    filteredUsers.length
                  )}{" "}
                  জন ব্যবহারকারী দেখানো হচ্ছে
                </span>

              ) : (

                <span>
                  মোট{" "}
                  {formatNumber(data.length)}{" "}
                  জন ব্যবহারকারী
                </span>

              )}

            </div>

          </div>

        )}

      </div>


      {/* Delete Modal */}

      {deleteItem && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-[2px]"
          onMouseDown={(e) => {

            if (
              e.target ===
              e.currentTarget
            ) {
              closeDeleteModal();
            }

          }}
        >

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-user-title"
            className="w-full max-w-md border border-slate-200 bg-white shadow-2xl"
          >

            <div className="px-6 pb-5 pt-6">

              <div className="flex items-start gap-4">

                <div className="grid size-11 shrink-0 place-items-center rounded-full bg-rose-50 text-rose-600">

                  <FaTrash />

                </div>


                <div>

                  <h2
                    id="delete-user-title"
                    className="font-display text-lg font-bold text-indigo-950"
                  >
                    ব্যবহারকারী মুছে ফেলবেন?
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    এই ব্যবহারকারীকে মুছে দিলে
                    তার অ্যাকাউন্ট আর এই সিস্টেমে
                    থাকবে না। এই কাজটি পরে ফিরিয়ে
                    আনা যাবে না।
                  </p>

                </div>

              </div>


              {/* User information */}

              <div className="mt-5 border border-slate-100 bg-slate-50 px-4 py-3">

                <div className="flex items-center gap-3">

                  {deleteItem.photo ? (

                    <img
                      src={deleteItem.photo}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="size-10 rounded-full object-cover"
                    />

                  ) : (

                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-indigo-900 font-semibold text-white">

                      {(
                        deleteItem.name ||
                        deleteItem.email ||
                        "U"
                      )
                        .charAt(0)
                        .toUpperCase()}

                    </span>

                  )}


                  <div className="min-w-0">

                    <p className="truncate font-semibold text-indigo-950">
                      {deleteItem.name ||
                        "নামহীন"}
                    </p>

                    <p className="truncate text-xs text-slate-500">
                      {deleteItem.email}
                    </p>

                  </div>

                </div>


                {deleteItem.phone && (

                  <div className="mt-3 flex items-center justify-between gap-4 border-t border-slate-200 pt-3">

                    <span className="text-sm text-slate-500">
                      মোবাইল
                    </span>

                    <span className="text-sm font-medium text-slate-700">
                      {deleteItem.phone}
                    </span>

                  </div>

                )}


                <div className="mt-2 flex items-center justify-between gap-4">

                  <span className="text-sm text-slate-500">
                    ভূমিকা
                  </span>

                  <span className="text-sm font-medium text-slate-700">

                    {deleteItem.role ===
                    "admin"
                      ? "অ্যাডমিন"
                      : "সাধারণ ব্যবহারকারী"}

                  </span>

                </div>

              </div>

            </div>


            {/* Modal actions */}

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
                onClick={removeUser}
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


