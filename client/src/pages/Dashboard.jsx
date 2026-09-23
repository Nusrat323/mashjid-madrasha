import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaHandHoldingHeart, FaDonate } from "react-icons/fa";
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
import { formatDate, formatTaka, methodLabel, purposeLabel } from "../lib/format.js";

export default function Dashboard() {
  const { user, setUser } = useAuth();
  const { data: donations, loading } = useFetch("/donations/mine", true);
  const [profile, setProfile] = useState({ name: user.name || "", phone: user.phone || "" });
  const [saving, setSaving] = useState(false);

  const list = donations || [];
  const completed = list.filter((item) => item.status === "completed");
  const total = completed.reduce((sum, item) => sum + item.amount, 0);

  const saveProfile = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      setUser(await api.patch("/users/me", profile, true));
      toast.success("প্রোফাইল আপডেট হয়েছে");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader title={`আসসালামু আলাইকুম, ${user.name || "ভাই"}`} text="আপনার প্রোফাইল ও সব দানের হিসাব এখানে দেখুন।" />

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-6">
          <Reveal>
            <div className="rounded-3xl bg-linear-to-br from-indigo-900 to-indigo-950 p-7 text-white">
              <p className="text-indigo-200">আপনার মোট সম্পন্ন দান</p>
              <p className="mt-2 font-display text-4xl font-bold text-amber-300">
                <CountUp value={total} format={formatTaka} />
              </p>
              <p className="mt-2 text-sm text-indigo-200">{completed.length.toLocaleString("bn-BD")} টি দান সম্পন্ন হয়েছে</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={saveProfile} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-7">
              <h2 className="font-display text-xl font-bold text-indigo-950">প্রোফাইল</h2>
              <Field label="ইমেইল">
                <input value={user.email} disabled className={`${inputClass} bg-slate-50 text-slate-500`} />
              </Field>
              <Field label="নাম">
                <input required value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className={inputClass} />
              </Field>
              <Field label="মোবাইল নম্বর">
                <input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className={inputClass} placeholder="01XXXXXXXXX" />
              </Field>
              <button
                disabled={saving}
                className="w-full rounded-xl bg-indigo-900 py-3 font-semibold text-white transition hover:bg-indigo-800 disabled:opacity-60"
              >
                {saving ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
              </button>
            </form>
          </Reveal>
        </div>

        <Reveal from="right" className="lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-indigo-950">আমার দানের তালিকা</h2>
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 font-semibold text-indigo-950 transition hover:bg-amber-300"
            >
              <FaHandHoldingHeart /> নতুন দান
            </Link>
          </div>

          {loading ? (
            <Loader />
          ) : list.length === 0 ? (
            <EmptyState icon={FaDonate} title="এখনো কোনো দান করা হয়নি" text="আপনার প্রথম দানটি করে সদকায়ে জারিয়ার অংশীদার হোন।" />
          ) : (
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left">
                  <thead className="bg-slate-50 text-sm text-slate-500">
                    <tr>
                      <th className="px-5 py-4 font-medium">তারিখ</th>
                      <th className="px-5 py-4 font-medium">পরিমাণ</th>
                      <th className="px-5 py-4 font-medium">উদ্দেশ্য</th>
                      <th className="px-5 py-4 font-medium">মাধ্যম</th>
                      <th className="px-5 py-4 font-medium">অবস্থা</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {list.map((item) => (
                      <tr key={item._id}>
                        <td className="px-5 py-4 text-sm">{formatDate(item.createdAt)}</td>
                        <td className="px-5 py-4 font-semibold text-indigo-950">{formatTaka(item.amount)}</td>
                        <td className="px-5 py-4 text-sm">{purposeLabel(item.purpose)}</td>
                        <td className="px-5 py-4 text-sm">{methodLabel(item.method)}</td>
                        <td className="px-5 py-4">
                          <StatusBadge status={item.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Reveal>
      </section>
    </>
  );
}
