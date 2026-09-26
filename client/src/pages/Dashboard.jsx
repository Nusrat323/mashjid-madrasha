
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaDonate,
  FaHandHoldingHeart,
  FaPhoneAlt,
  FaRegClock,
  FaTrash,
  FaTimes,
  FaUser,
} from "react-icons/fa";

import PageHeader from "../components/PageHeader.jsx";
import Reveal from "../components/Reveal.jsx";
import Loader from "../components/Loader.jsx";
import EmptyState from "../components/EmptyState.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import CountUp from "../components/CountUp.jsx";
import { Field, inputClass } from "../components/Field.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import useFetch from "../hooks/useFetch.js";
import { api } from "../lib/api.js";
import {
  formatDate,
  formatTaka,
  methodLabel,
  purposeLabel,
} from "../lib/format.js";

export default function Dashboard() {
  const { user, setUser } = useAuth();

  const {
    data: donations,
    loading,
    reload,
  } = useFetch("/donations/mine", true);

  const [profile, setProfile] = useState({
    name: user.name || "",
    phone: user.phone || "",
  });

  const [saving, setSaving] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const list = donations || [];

  const completed = list.filter(
    (item) => item.status === "completed"
  );

  const pending = list.filter(
    (item) => item.status === "pending"
  );

  const total = completed.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const latestDonation = list[0];

  const donationToDelete = list.find(
    (item) => item._id === deleteId
  );

  const saveProfile = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const updatedUser = await api.patch(
        "/users/me",
        profile,
        true
      );

      setUser(updatedUser);

      toast.success("প্রোফাইল আপডেট হয়েছে");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
  };

  const closeDeleteModal = () => {
    if (deleting) return;

    setDeleteId(null);
  };

  const removeDonation = async () => {
    if (!deleteId) return;

    setDeleting(true);

    try {
      await api.remove(
        `/donations/mine/${deleteId}`,
        true
      );

      toast.success(
        "দানটি সফলভাবে মুছে ফেলা হয়েছে"
      );

      setDeleteId(null);

      await reload();
    } catch (err) {
      toast.error(
        err.message || "দানটি মুছে ফেলা যায়নি"
      );
    } finally {
      setDeleting(false);
    }
  };

  const firstName =
    user.name?.trim()?.split(" ")[0] || "ভাই";

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <PageHeader
        title={`আসসালামু আলাইকুম, ${firstName}`}
        text="আপনার প্রোফাইল, দানের হিসাব ও সাম্প্রতিক কার্যক্রম এক জায়গা থেকে দেখুন।"
      />

      <main className="w-full max-w-full overflow-x-hidden bg-[#f8fafc]">
        <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
          <Reveal>
            <div className="relative w-full max-w-full overflow-hidden rounded-[1.5rem] bg-indigo-950 px-5 py-7 text-white shadow-xl shadow-indigo-950/10 sm:rounded-[2rem] sm:px-9 sm:py-9">
              <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-indigo-700/30 blur-3xl" />

              <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />

              <div className="relative z-10 flex min-w-0 max-w-full items-center gap-3 sm:gap-4">
                <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10 sm:size-14 sm:rounded-2xl">
                  <FaUser className="text-lg text-amber-300 sm:text-xl" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-indigo-200 sm:text-sm">
                    আপনার ড্যাশবোর্ড
                  </p>

                  <h1 className="mt-1 break-words font-display text-xl font-bold sm:text-3xl">
                    {user.name || "স্বাগতম"}
                  </h1>

                  <p className="mt-1 max-w-full break-all text-xs text-indigo-200 sm:text-sm">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-5 grid w-full min-w-0 max-w-full gap-4 sm:mt-6 sm:grid-cols-3">
            <Reveal delay={0.05}>
              <div className="h-full min-w-0 border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-slate-500">
                      মোট সম্পন্ন দান
                    </p>

                    <p className="mt-2 break-words font-display text-2xl font-bold tracking-tight text-indigo-950 sm:mt-3 sm:text-3xl">
                      <CountUp
                        value={total}
                        format={formatTaka}
                      />
                    </p>
                  </div>

                  <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600 sm:size-11">
                    <FaHandHoldingHeart />
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-400 sm:mt-4">
                  {completed.length.toLocaleString("bn-BD")} টি দান সম্পন্ন
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full min-w-0 border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-slate-500">
                      মোট দানের সংখ্যা
                    </p>

                    <p className="mt-2 font-display text-2xl font-bold tracking-tight text-indigo-950 sm:mt-3 sm:text-3xl">
                      {list.length.toLocaleString("bn-BD")}
                    </p>
                  </div>

                  <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-700 sm:size-11">
                    <FaDonate />
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-400 sm:mt-4">
                  আপনার করা সব দানের হিসাব
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="h-full min-w-0 border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-slate-500">
                      অপেক্ষমাণ দান
                    </p>

                    <p className="mt-2 font-display text-2xl font-bold tracking-tight text-indigo-950 sm:mt-3 sm:text-3xl">
                      {pending.length.toLocaleString("bn-BD")}
                    </p>
                  </div>

                  <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-600 sm:size-11">
                    <FaRegClock />
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-400 sm:mt-4">
                  যাচাই বা সম্পন্ন হওয়ার অপেক্ষায়
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-6 grid w-full min-w-0 max-w-full gap-6 lg:mt-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-8">
            <Reveal>
              <div className="w-full max-w-full min-w-0 border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-5 py-4 sm:px-6 sm:py-5">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-700">
                      <FaUser />
                    </div>

                    <div className="min-w-0">
                      <h2 className="font-display font-bold text-indigo-950">
                        প্রোফাইল
                      </h2>

                      <p className="text-xs text-slate-400">
                        আপনার তথ্য আপডেট করুন
                      </p>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={saveProfile}
                  className="space-y-5 p-5 sm:p-6"
                >
                  <Field label="ইমেইল">
                    <input
                      value={user.email}
                      disabled
                      className={`${inputClass} w-full max-w-full cursor-not-allowed bg-slate-50 text-slate-500`}
                    />
                  </Field>

                  <Field label="নাম">
                    <input
                      required
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          name: e.target.value,
                        })
                      }
                      className={`${inputClass} w-full max-w-full`}
                      placeholder="আপনার পূর্ণ নাম"
                    />
                  </Field>

                  <Field label="মোবাইল নম্বর">
                    <div className="relative w-full max-w-full">
                      <FaPhoneAlt className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-400" />

                      <input
                        value={profile.phone}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            phone: e.target.value,
                          })
                        }
                        className={`${inputClass} w-full max-w-full pl-10`}
                        placeholder="01XXXXXXXXX"
                      />
                    </div>
                  </Field>

                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full rounded-xl bg-indigo-950 py-3 text-sm font-semibold text-white transition hover:bg-indigo-900 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
                  >
                    {saving
                      ? "সংরক্ষণ হচ্ছে..."
                      : "পরিবর্তন সংরক্ষণ করুন"}
                  </button>
                </form>
              </div>
            </Reveal>

            <Reveal from="right">
              <div className="w-full max-w-full min-w-0 border border-slate-200 bg-white shadow-sm">
                <div className="flex min-w-0 flex-col gap-4 border-b border-slate-100 px-5 py-4 sm:px-6 sm:py-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <h2 className="font-display text-lg font-bold text-indigo-950 sm:text-xl">
                      আমার দানের হিসাব
                    </h2>

                    <p className="mt-1 break-words text-sm text-slate-500">
                      আপনার সাম্প্রতিক দানগুলোর বিস্তারিত তথ্য
                    </p>
                  </div>

                  <Link
                    to="/donate"
                    className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-indigo-950 transition hover:bg-amber-300 sm:w-fit"
                  >
                    <FaHandHoldingHeart />
                    নতুন দান করুন
                  </Link>
                </div>

                {latestDonation && !loading && (
                  <div className="mx-4 mt-4 flex min-w-0 flex-col gap-4 border border-slate-100 bg-slate-50 p-4 sm:mx-6 sm:mt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-emerald-600 shadow-sm">
                        <FaCheckCircle />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-slate-400">
                          সর্বশেষ দান
                        </p>

                        <p className="mt-0.5 break-words font-semibold text-indigo-950">
                          {purposeLabel(
                            latestDonation.purpose
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 sm:text-right">
                      <p className="font-display text-lg font-bold text-indigo-950">
                        {formatTaka(
                          latestDonation.amount
                        )}
                      </p>

                      <p className="text-xs text-slate-400">
                        {formatDate(
                          latestDonation.createdAt
                        )}
                      </p>
                    </div>
                  </div>
                )}

                <div className="p-4 sm:p-6">
                  {loading ? (
                    <Loader />
                  ) : list.length === 0 ? (
                    <EmptyState
                      icon={FaDonate}
                      title="এখনো কোনো দান করা হয়নি"
                      text="আপনার প্রথম দানটি করে সদকায়ে জারিয়ার অংশীদার হোন।"
                    />
                  ) : (
                    <>
                      <div className="hidden overflow-hidden border border-slate-100 sm:block">
                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[760px] text-left">
                            <thead className="border-b border-slate-100 bg-slate-50">
                              <tr>
                                <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-5 sm:py-4">
                                  তারিখ
                                </th>

                                <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-5 sm:py-4">
                                  পরিমাণ
                                </th>

                                <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-5 sm:py-4">
                                  উদ্দেশ্য
                                </th>

                                <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-5 sm:py-4">
                                  মাধ্যম
                                </th>

                                <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-5 sm:py-4">
                                  অবস্থা
                                </th>

                                <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-5 sm:py-4">
                                  অ্যাকশন
                                </th>
                              </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                              {list.map((item) => (
                                <tr
                                  key={item._id}
                                  className="transition hover:bg-slate-50/80"
                                >
                                  <td className="whitespace-nowrap px-4 py-3 sm:px-5 sm:py-4">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                      <FaCalendarAlt className="text-xs text-slate-400" />

                                      {formatDate(
                                        item.createdAt
                                      )}
                                    </div>
                                  </td>

                                  <td className="whitespace-nowrap px-4 py-3 sm:px-5 sm:py-4">
                                    <span className="font-semibold text-indigo-950">
                                      {formatTaka(
                                        item.amount
                                      )}
                                    </span>
                                  </td>

                                  <td className="px-4 py-3 text-sm text-slate-600 sm:px-5 sm:py-4">
                                    {purposeLabel(
                                      item.purpose
                                    )}
                                  </td>

                                  <td className="px-4 py-3 text-sm text-slate-600 sm:px-5 sm:py-4">
                                    {methodLabel(
                                      item.method
                                    )}
                                  </td>

                                  <td className="whitespace-nowrap px-4 py-3 sm:px-5 sm:py-4">
                                    <StatusBadge
                                      status={item.status}
                                    />
                                  </td>

                                  <td className="whitespace-nowrap px-4 py-3 sm:px-5 sm:py-4">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        openDeleteModal(
                                          item._id
                                        )
                                      }
                                      title="দানটি মুছুন"
                                      className="grid size-9 place-items-center rounded-lg bg-rose-50 text-rose-600 transition hover:bg-rose-100 hover:text-rose-700"
                                    >
                                      <FaTrash className="text-sm" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="space-y-3 sm:hidden">
                        {list.map((item) => (
                          <div
                            key={item._id}
                            className="border border-slate-100 bg-slate-50 p-4"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex min-w-0 items-center gap-3">
                                <div className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-emerald-600 shadow-sm">
                                  <FaCheckCircle />
                                </div>

                                <div className="min-w-0">
                                  <p className="break-words font-semibold text-indigo-950">
                                    {purposeLabel(
                                      item.purpose
                                    )}
                                  </p>

                                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                                    <FaCalendarAlt />

                                    <span>
                                      {formatDate(
                                        item.createdAt
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  openDeleteModal(
                                    item._id
                                  )
                                }
                                title="দানটি মুছুন"
                                className="grid size-9 shrink-0 place-items-center rounded-lg bg-rose-50 text-rose-600 transition hover:bg-rose-100 hover:text-rose-700"
                              >
                                <FaTrash className="text-sm" />
                              </button>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
                              <div>
                                <p className="text-xs text-slate-400">
                                  পরিমাণ
                                </p>

                                <p className="mt-1 font-display font-bold text-indigo-950">
                                  {formatTaka(
                                    item.amount
                                  )}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-slate-400">
                                  মাধ্যম
                                </p>

                                <p className="mt-1 text-sm font-medium text-slate-700">
                                  {methodLabel(
                                    item.method
                                  )}
                                </p>
                              </div>

                              <div className="col-span-2">
                                <p className="text-xs text-slate-400">
                                  অবস্থা
                                </p>

                                <div className="mt-1">
                                  <StatusBadge
                                    status={item.status}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="mt-6 w-full border border-amber-100 bg-amber-50/60 px-5 py-4 sm:mt-8 sm:px-6 sm:py-5">
              <p className="font-semibold text-indigo-950">
                আপনার দান একটি ভালো কাজের অংশ
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                আল্লাহ আপনাদের দান কবুল করুন এবং উত্তম প্রতিদান দিন। আমিন।
              </p>
            </div>
          </Reveal>
        </section>
      </main>

      {deleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-indigo-950/40 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-rose-50 text-base text-rose-600 sm:size-12 sm:text-lg">
                  <FaTrash />
                </div>

                <div className="min-w-0">
                  <h2 className="font-display text-lg font-bold text-indigo-950 sm:text-xl">
                    দানটি মুছে ফেলবেন?
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
                  এই দানটি আপনার দানের ইতিহাস থেকে মুছে ফেলা হবে। এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={deleting}
                className="grid size-9 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
                title="বন্ধ করুন"
              >
                <FaTimes />
              </button>
            </div>

            {donationToDelete && (
              <div className="mt-5 border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">
                      দানের উদ্দেশ্য
                    </p>

                    <p className="mt-1 break-words font-semibold text-indigo-950">
                      {purposeLabel(
                        donationToDelete.purpose
                      )}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="font-display font-bold text-indigo-950">
                      {formatTaka(
                        donationToDelete.amount
                      )}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {formatDate(
                        donationToDelete.createdAt
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={deleting}
                className="w-full rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                বাতিল
              </button>

              <button
                type="button"
                onClick={removeDonation}
                disabled={deleting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-3 font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                <FaTrash />

                {deleting
                  ? "মুছে ফেলা হচ্ছে..."
                  : "মুছে ফেলুন"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

