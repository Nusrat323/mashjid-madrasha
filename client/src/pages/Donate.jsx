import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaCopy, FaLock, FaQuoteLeft, FaHandHoldingHeart } from "react-icons/fa";
import PageHeader from "../components/PageHeader.jsx";
import Reveal from "../components/Reveal.jsx";
import Loader from "../components/Loader.jsx";
import { Field, inputClass } from "../components/Field.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useSettings } from "../context/SettingsContext.jsx";
import { api } from "../lib/api.js";
import { formatTaka } from "../lib/format.js";
import { purposes, methods } from "../data/site.js";

const presetAmounts = [200, 500, 1000, 2000, 5000];

const steps = [
  "লগইন করুন",
  "দানের পরিমাণ ও পেমেন্ট মাধ্যম বেছে নিন",
  "পেমেন্ট করুন এবং ট্রানজেকশন আইডি জমা দিন",
  "যাচাইয়ের পর আপনার দান তালিকায় সম্পন্ন হিসেবে দেখা যাবে",
];

function CopyRow({ label, value }) {
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    toast.success("কপি করা হয়েছে");
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3">
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="truncate font-semibold text-indigo-950">{value}</p>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label="কপি করুন"
        className="grid size-9 shrink-0 place-items-center rounded-lg bg-indigo-50 text-indigo-700 transition hover:bg-indigo-100"
      >
        <FaCopy />
      </button>
    </div>
  );
}

function PaymentInstructions({ method, settings, gateway }) {
  if (gateway) {
    return (
      <p className="rounded-2xl bg-pink-50 p-5 text-pink-800">
        নিচের বাটনে চাপ দিলে আপনি নিরাপদ বিকাশ পেমেন্ট পেজে যাবেন। পেমেন্ট সম্পন্ন হলে দান স্বয়ংক্রিয়ভাবে যাচাই হয়ে যাবে।
      </p>
    );
  }

  if (method === "bank") {
    const hasBank = settings.bankAccountNumber;
    return (
      <div className="space-y-2 rounded-2xl bg-slate-50 p-4">
        {hasBank ? (
          <>
            <CopyRow label="ব্যাংকের নাম" value={settings.bankName} />
            <CopyRow label="অ্যাকাউন্টের নাম" value={settings.bankAccountName} />
            <CopyRow label="অ্যাকাউন্ট নম্বর" value={settings.bankAccountNumber} />
            {settings.bankBranch && <CopyRow label="শাখা" value={settings.bankBranch} />}
            <p className="px-1 pt-2 text-sm text-slate-500">ব্যাংকে টাকা জমা বা ট্রান্সফার করে রেফারেন্স / ট্রানজেকশন আইডি নিচে লিখুন।</p>
          </>
        ) : (
          <p className="p-2 text-slate-500">ব্যাংকের তথ্য এখনো যোগ করা হয়নি। অনুগ্রহ করে অন্য মাধ্যম ব্যবহার করুন।</p>
        )}
      </div>
    );
  }

  const number = method === "bkash" ? settings.bkashNumber : settings.nagadNumber;
  const name = method === "bkash" ? "বিকাশ" : "নগদ";

  return (
    <div className="space-y-2 rounded-2xl bg-slate-50 p-4">
      {number ? (
        <>
          <CopyRow label={`${name} নম্বর`} value={number} />
          <p className="px-1 pt-2 text-sm text-slate-500">
            {name} অ্যাপ থেকে এই নম্বরে টাকা পাঠান, তারপর নিচে আপনার নম্বর ও ট্রানজেকশন আইডি (TrxID) লিখুন।
          </p>
        </>
      ) : (
        <p className="p-2 text-slate-500">{name} নম্বর এখনো যোগ করা হয়নি। অনুগ্রহ করে অন্য মাধ্যম ব্যবহার করুন।</p>
      )}
    </div>
  );
}

export default function Donate() {
  const { user, loading } = useAuth();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();

  const [form, setForm] = useState({
    amount: 500,
    purpose: params.get("purpose") || "general",
    method: "bkash",
    phone: "",
    senderNumber: "",
    transactionId: "",
    isAnonymous: false,
    note: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user?.phone) setForm((current) => ({ ...current, phone: user.phone }));
  }, [user]);

  const set = (name, value) => setForm((current) => ({ ...current, [name]: value }));

  const useGateway = form.method === "bkash" && settings.bkashGateway;
  const needsSender = form.method !== "bank";

  const submit = async (event) => {
    event.preventDefault();
    const amount = Number(form.amount);

    if (!amount || amount < 10) {
      return toast.error("সর্বনিম্ন দান ১০ টাকা");
    }

    if (!useGateway && !form.transactionId.trim()) {
      return toast.error("ট্রানজেকশন আইডি দিন");
    }

    setSubmitting(true);
    try {
      if (useGateway) {
        const { url } = await api.post(
          "/donations/bkash",
          { amount, purpose: form.purpose, phone: form.phone, isAnonymous: form.isAnonymous, note: form.note },
          true
        );
        window.location.href = url;
        return;
      }

      await api.post("/donations", { ...form, amount }, true);
      toast.success("জাযাকাল্লাহু খাইরান! আপনার দান যাচাইয়ের জন্য জমা হয়েছে");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader title="দান করুন" text="আপনার সামান্য দানও মসজিদ ও মাদ্রাসার কাজে বড় সহায়তা। আল্লাহ আপনার দান কবুল করুন।" />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-5 lg:px-8">
        <Reveal from="left" className="lg:col-span-3">
          {loading ? (
            <Loader />
          ) : !user ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-indigo-900/5 sm:p-14">
              <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-indigo-50 text-2xl text-indigo-700">
                <FaLock />
              </span>
              <h2 className="mt-6 font-display text-2xl font-bold text-indigo-950">দান করতে লগইন করুন</h2>
              <p className="mx-auto mt-3 max-w-md text-slate-600">
                নিরাপত্তা ও হিসাবের স্বচ্ছতার জন্য দান করতে লগইন করা প্রয়োজন। লগইন করলে আপনার সব দানের তালিকাও দেখতে পারবেন।
              </p>
              <Link
                to="/login"
                state={{ from: location.pathname + location.search }}
                className="mt-8 inline-block rounded-xl bg-indigo-900 px-8 py-3.5 font-semibold text-white transition hover:bg-indigo-800"
              >
                লগইন / নতুন অ্যাকাউন্ট
              </Link>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-indigo-900/5 sm:p-10">
              <div>
                <h2 className="font-display text-xl font-bold text-indigo-950">দানের পরিমাণ</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {presetAmounts.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => set("amount", value)}
                      className={`rounded-xl border px-5 py-2.5 font-semibold transition ${
                        Number(form.amount) === value
                          ? "border-indigo-900 bg-indigo-900 text-white"
                          : "border-slate-200 text-slate-700 hover:border-indigo-300"
                      }`}
                    >
                      {formatTaka(value)}
                    </button>
                  ))}
                </div>
                <div className="mt-4">
                  <Field label="অন্য পরিমাণ (টাকা)">
                    <input
                      type="number"
                      min="10"
                      value={form.amount}
                      onChange={(e) => set("amount", e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                </div>
              </div>

              <Field label="দানের উদ্দেশ্য">
                <select value={form.purpose} onChange={(e) => set("purpose", e.target.value)} className={inputClass}>
                  {purposes.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </Field>

              <div>
                <h2 className="font-display text-xl font-bold text-indigo-950">পেমেন্ট মাধ্যম</h2>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {methods.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => set("method", item.value)}
                      className={`rounded-xl border-2 py-3 font-semibold transition ${
                        form.method === item.value ? item.active : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <motion.div key={form.method} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                  <PaymentInstructions method={form.method} settings={settings} gateway={useGateway} />
                </motion.div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="আপনার মোবাইল নম্বর">
                  <input value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputClass} placeholder="01XXXXXXXXX" />
                </Field>
                {!useGateway && needsSender && (
                  <Field label="যে নম্বর থেকে পাঠিয়েছেন">
                    <input value={form.senderNumber} onChange={(e) => set("senderNumber", e.target.value)} className={inputClass} placeholder="01XXXXXXXXX" />
                  </Field>
                )}
              </div>

              {!useGateway && (
                <Field label={form.method === "bank" ? "ব্যাংক রেফারেন্স / ট্রানজেকশন আইডি" : "ট্রানজেকশন আইডি (TrxID)"}>
                  <input value={form.transactionId} onChange={(e) => set("transactionId", e.target.value)} className={inputClass} placeholder="যেমন: 9A7B6C5D4E" />
                </Field>
              )}

              <Field label="মন্তব্য (ঐচ্ছিক)">
                <textarea rows={3} value={form.note} onChange={(e) => set("note", e.target.value)} className={inputClass} placeholder="কোনো বিশেষ কথা থাকলে লিখুন" />
              </Field>

              <label className="flex items-center gap-3 text-slate-700">
                <input
                  type="checkbox"
                  checked={form.isAnonymous}
                  onChange={(e) => set("isAnonymous", e.target.checked)}
                  className="size-5 rounded accent-indigo-900"
                />
                আমার নাম প্রকাশ করতে চাই না
              </label>

              <button
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 py-4 text-lg font-bold text-indigo-950 shadow-lg shadow-amber-400/30 transition hover:bg-amber-300 disabled:opacity-60"
              >
                <FaHandHoldingHeart />
                {submitting ? "অপেক্ষা করুন..." : useGateway ? `বিকাশে ${formatTaka(form.amount)} পেমেন্ট করুন` : `${formatTaka(form.amount)} দান জমা দিন`}
              </button>
            </form>
          )}
        </Reveal>

        <div className="space-y-6 lg:col-span-2">
          <Reveal from="right">
            <div className="rounded-3xl bg-linear-to-br from-indigo-900 to-indigo-950 p-8 text-white">
              <FaQuoteLeft className="text-2xl text-amber-400" />
              <p className="mt-4 font-display text-xl font-semibold leading-relaxed">
                যে ব্যক্তি আল্লাহর সন্তুষ্টির উদ্দেশ্যে মসজিদ নির্মাণ করে, আল্লাহ তার জন্য জান্নাতে অনুরূপ একটি ঘর নির্মাণ করেন।
              </p>
              <p className="mt-3 text-sm text-indigo-200">— সহীহ বুখারি ও সহীহ মুসলিম</p>
            </div>
          </Reveal>

          <Reveal from="right" delay={0.15}>
            <div className="rounded-3xl border border-slate-200 bg-white p-8">
              <h3 className="font-display text-xl font-bold text-indigo-950">কীভাবে দান করবেন</h3>
              <ol className="mt-5 space-y-4">
                {steps.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-amber-100 text-sm font-bold text-amber-800">
                      {(index + 1).toLocaleString("bn-BD")}
                    </span>
                    <span className="text-slate-600">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
