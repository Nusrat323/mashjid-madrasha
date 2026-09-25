
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
  const { data: donations, loading } = useFetch("/donations/mine", true);

  const [profile, setProfile] = useState({
    name: user.name || "",
    phone: user.phone || "",
  });

  const [saving, setSaving] = useState(false);

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

  const firstName =
    user.name?.trim()?.split(" ")[0] || "ভাই";

  return (
    <>
      <PageHeader
        title={`আসসালামু আলাইকুম, ${firstName}`}
        text="আপনার প্রোফাইল, দানের হিসাব ও সাম্প্রতিক কার্যক্রম এক জায়গা থেকে দেখুন।"
      />

      <main className="bg-[#f8fafc]">
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

          {/* ───────────────── Welcome / Overview ───────────────── */}

          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-indigo-950 px-6 py-8 text-white shadow-xl shadow-indigo-950/10 sm:px-9 sm:py-9">
              <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-indigo-700/30 blur-3xl" />

              <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />

              <div className="relative z-10 flex items-center gap-4">
                <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/10">
                  <FaUser className="text-xl text-amber-300" />
                </div>

                <div>
                  <p className="text-sm font-medium text-indigo-200">
                    আপনার ড্যাশবোর্ড
                  </p>

                  <h1 className="mt-1 font-display text-2xl font-bold sm:text-3xl">
                    {user.name || "স্বাগতম"}
                  </h1>

                  <p className="mt-1 text-sm text-indigo-200">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ───────────────── Statistics ───────────────── */}

          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            <Reveal delay={0.05}>
              <div className="h-full border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">
                      মোট সম্পন্ন দান
                    </p>

                    <p className="mt-3 font-display text-3xl font-bold tracking-tight text-indigo-950">
                      <CountUp
                        value={total}
                        format={formatTaka}
                      />
                    </p>
                  </div>

                  <div className="grid size-11 place-items-center rounded-xl bg-amber-50 text-amber-600">
                    <FaHandHoldingHeart />
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-400">
                  {completed.length.toLocaleString("bn-BD")} টি দান সম্পন্ন
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">
                      মোট দানের সংখ্যা
                    </p>

                    <p className="mt-3 font-display text-3xl font-bold tracking-tight text-indigo-950">
                      {list.length.toLocaleString("bn-BD")}
                    </p>
                  </div>

                  <div className="grid size-11 place-items-center rounded-xl bg-indigo-50 text-indigo-700">
                    <FaDonate />
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-400">
                  আপনার করা সব দানের হিসাব
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="h-full border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">
                      অপেক্ষমাণ দান
                    </p>

                    <p className="mt-3 font-display text-3xl font-bold tracking-tight text-indigo-950">
                      {pending.length.toLocaleString("bn-BD")}
                    </p>
                  </div>

                  <div className="grid size-11 place-items-center rounded-xl bg-slate-100 text-slate-600">
                    <FaRegClock />
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-400">
                  যাচাই বা সম্পন্ন হওয়ার অপেক্ষায়
                </p>
              </div>
            </Reveal>
          </div>

          {/* ───────────────── Main Content ───────────────── */}

          <div className="mt-8 grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">

            {/* Profile */}

            <Reveal>
              <div className="border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-100 px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-700">
                      <FaUser />
                    </div>

                    <div>
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
                  className="space-y-5 p-6"
                >
                  <Field label="ইমেইল">
                    <input
                      value={user.email}
                      disabled
                      className={`${inputClass} cursor-not-allowed bg-slate-50 text-slate-500`}
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
                      className={inputClass}
                      placeholder="আপনার পূর্ণ নাম"
                    />
                  </Field>

                  <Field label="মোবাইল নম্বর">
                    <div className="relative">
                      <FaPhoneAlt className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-400" />

                      <input
                        value={profile.phone}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            phone: e.target.value,
                          })
                        }
                        className={`${inputClass} pl-10`}
                        placeholder="01XXXXXXXXX"
                      />
                    </div>
                  </Field>

                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full rounded-xl bg-indigo-950 py-3 font-semibold text-white transition hover:bg-indigo-900 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving
                      ? "সংরক্ষণ হচ্ছে..."
                      : "পরিবর্তন সংরক্ষণ করুন"}
                  </button>
                </form>
              </div>
            </Reveal>

            {/* Donation Activity */}

            <Reveal from="right">
              <div className="border border-slate-200 bg-white shadow-sm">

                <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <h2 className="font-display text-xl font-bold text-indigo-950">
                      আমার দানের হিসাব
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      আপনার সাম্প্রতিক দানগুলোর বিস্তারিত তথ্য
                    </p>
                  </div>

                  {/* Primary CTA — only one on this page */}

                  <Link
                    to="/donate"
                    className="inline-flex w-fit items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-indigo-950 transition hover:bg-amber-300"
                  >
                    <FaHandHoldingHeart />
                    নতুন দান করুন
                  </Link>
                </div>

                {/* Latest Donation */}

                {latestDonation && !loading && (
                  <div className="mx-6 mt-5 flex flex-col gap-4 border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-3">
                      <div className="grid size-10 place-items-center rounded-full bg-white text-emerald-600 shadow-sm">
                        <FaCheckCircle />
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          সর্বশেষ দান
                        </p>

                        <p className="mt-0.5 font-semibold text-indigo-950">
                          {purposeLabel(
                            latestDonation.purpose
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="sm:text-right">
                      <p className="font-display text-lg font-bold text-indigo-950">
                        {formatTaka(latestDonation.amount)}
                      </p>

                      <p className="text-xs text-slate-400">
                        {formatDate(
                          latestDonation.createdAt
                        )}
                      </p>
                    </div>
                  </div>
                )}

                <div className="p-6">

                  {loading ? (
                    <Loader />
                  ) : list.length === 0 ? (
                    <EmptyState
                      icon={FaDonate}
                      title="এখনো কোনো দান করা হয়নি"
                      text="আপনার প্রথম দানটি করে সদকায়ে জারিয়ার অংশীদার হোন।"
                    />
                  ) : (
                    <div className="overflow-hidden border border-slate-100">
                      <div className="overflow-x-auto">

                        <table className="w-full min-w-[680px] text-left">

                          <thead className="border-b border-slate-100 bg-slate-50">
                            <tr>
                              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                তারিখ
                              </th>

                              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                পরিমাণ
                              </th>

                              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                উদ্দেশ্য
                              </th>

                              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                মাধ্যম
                              </th>

                              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                অবস্থা
                              </th>
                            </tr>
                          </thead>

                          <tbody className="divide-y divide-slate-100">

                            {list.map((item) => (
                              <tr
                                key={item._id}
                                className="transition hover:bg-slate-50/80"
                              >
                                <td className="px-5 py-4">
                                  <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <FaCalendarAlt className="text-xs text-slate-400" />
                                    {formatDate(
                                      item.createdAt
                                    )}
                                  </div>
                                </td>

                                <td className="px-5 py-4">
                                  <span className="font-semibold text-indigo-950">
                                    {formatTaka(item.amount)}
                                  </span>
                                </td>

                                <td className="px-5 py-4 text-sm text-slate-600">
                                  {purposeLabel(
                                    item.purpose
                                  )}
                                </td>

                                <td className="px-5 py-4 text-sm text-slate-600">
                                  {methodLabel(
                                    item.method
                                  )}
                                </td>

                                <td className="px-5 py-4">
                                  <StatusBadge
                                    status={item.status}
                                  />
                                </td>
                              </tr>
                            ))}

                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>

          {/* ───────────────── Bottom Information ───────────────── */}

          <Reveal delay={0.1}>
            <div className="mt-8 border border-amber-100 bg-amber-50/60 px-6 py-5">

              <p className="font-semibold text-indigo-950">
                আপনার দান একটি ভালো কাজের অংশ
              </p>

              <p className="mt-1 text-sm text-slate-600">
                আল্লাহ আপনাদের দান কবুল করুন এবং উত্তম প্রতিদান দিন। আমিন।
              </p>

            </div>
          </Reveal>

        </section>
      </main>
    </>
  );
}

