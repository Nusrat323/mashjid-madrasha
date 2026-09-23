import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaBullhorn } from "react-icons/fa";
import PageHeader from "../components/PageHeader.jsx";
import Loader from "../components/Loader.jsx";
import EmptyState from "../components/EmptyState.jsx";
import useFetch from "../hooks/useFetch.js";
import { noticeCategories } from "../data/site.js";
import { formatDate } from "../lib/format.js";

export default function Notices() {
  const { data, loading } = useFetch("/notices");
  const [category, setCategory] = useState("all");

  const notices = (data || []).filter((notice) => category === "all" || notice.category === category);

  return (
    <>
      <PageHeader title="নোটিশ বোর্ড" text="মসজিদ ও মাদ্রাসার সব ঘোষণা ও গুরুত্বপূর্ণ বিজ্ঞপ্তি।" />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex flex-wrap gap-2">
          {[{ value: "all", label: "সব" }, ...noticeCategories].map((item) => (
            <button
              key={item.value}
              onClick={() => setCategory(item.value)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                category === item.value
                  ? "border-indigo-900 bg-indigo-900 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {loading ? (
          <Loader />
        ) : notices.length === 0 ? (
          <EmptyState icon={FaBullhorn} title="কোনো নোটিশ নেই" text="এই বিভাগে এখনো কোনো নোটিশ দেওয়া হয়নি।" />
        ) : (
          <div className="space-y-5">
            <AnimatePresence mode="popLayout">
              {notices.map((notice, index) => {
                const meta = noticeCategories.find((item) => item.value === notice.category) || noticeCategories[0];
                return (
                  <motion.article
                    key={notice._id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-indigo-300 hover:shadow-lg sm:p-8"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${meta.className}`}>{meta.label}</span>
                      <time className="text-sm text-slate-500">{formatDate(notice.createdAt)}</time>
                    </div>
                    <h2 className="mt-4 font-display text-2xl font-bold leading-snug text-indigo-950">{notice.title}</h2>
                    <p className="mt-3 whitespace-pre-line text-lg text-slate-600">{notice.body}</p>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </section>
    </>
  );
}
