
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaBullhorn,
  FaArrowRight,
} from "react-icons/fa";

import EmptyState from "../components/EmptyState.jsx";
import Loader from "../components/Loader.jsx";
import useFetch from "../hooks/useFetch.js";
import { noticeCategories } from "../data/site.js";

export default function Notices() {
  const { data, loading } = useFetch("/notices");

  const [category, setCategory] = useState("all");

  const notices = (data || []).filter(
    (notice) =>
      category === "all" ||
      notice.category === category
  );

  const filters = [
    {
      value: "all",
      label: "সব",
    },
    ...noticeCategories,
  ];

  const formatBanglaDate = (dateValue) => {
    const date = new Date(dateValue);

    return new Intl.DateTimeFormat("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:py-14">

        
        <div className="mb-7 border-b border-slate-200 pb-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            
            <div>
              <div className="flex items-center gap-2">
                <span className="h-5 w-1 bg-amber-500" />

                <h1 className="font-display text-2xl font-bold text-indigo-950 sm:text-3xl">
                  নোটিশ
                </h1>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                মসজিদ ও মাদ্রাসার সাম্প্রতিক ঘোষণা ও বিজ্ঞপ্তি
              </p>
            </div>

            
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {filters.map((item) => {
                const active =
                  category === item.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() =>
                      setCategory(item.value)
                    }
                    className={`
                      relative pb-1 text-sm font-medium
                      transition-colors duration-200
                      ${
                        active
                          ? "text-indigo-950"
                          : "text-slate-500 hover:text-indigo-900"
                      }
                      after:absolute
                      after:bottom-0
                      after:left-0
                      after:h-[2px]
                      after:bg-indigo-900
                      after:transition-all
                      after:duration-200
                      ${
                        active
                          ? "after:w-full"
                          : "after:w-0"
                      }
                    `}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

       
        {loading ? (
          <div className="flex min-h-[280px] items-center justify-center">
            <Loader />
          </div>
        ) : notices.length === 0 ? (
          <div className="border border-dashed border-slate-300 bg-white px-6 py-16">
            <EmptyState
              icon={FaBullhorn}
              title="কোনো নোটিশ নেই"
              text="এই মুহূর্তে কোনো নোটিশ প্রকাশ করা হয়নি।"
            />
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {notices.map((notice, index) => {
                const meta =
                  noticeCategories.find(
                    (item) =>
                      item.value ===
                      notice.category
                  ) ||
                  noticeCategories[0];

                const date = new Date(
                  notice.createdAt
                );

                const day = new Intl.DateTimeFormat(
                  "bn-BD",
                  {
                    day: "numeric",
                  }
                ).format(date);

                const monthYear =
                  new Intl.DateTimeFormat(
                    "bn-BD",
                    {
                      month: "long",
                      year: "numeric",
                    }
                  ).format(date);

                return (
                  <motion.article
                    key={notice._id}
                    layout
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                    }}
                    transition={{
                      duration: 0.25,
                      delay: index * 0.03,
                    }}
                    className="group border border-slate-200 bg-white transition-all duration-300 hover:border-indigo-200 hover:shadow-[0_8px_25px_rgba(30,41,59,0.06)]"
                  >
                    <div className="grid md:grid-cols-[100px_minmax(0,1fr)_44px]">

                     
                      <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/60 px-4 py-3 md:block md:border-b-0 md:border-r md:px-5 md:py-5">

                        <div className="font-display text-2xl font-bold leading-none text-indigo-950">
                          {day}
                        </div>

                        <div className="text-xs font-medium text-slate-500 md:mt-1">
                          {monthYear}
                        </div>
                      </div>

                      
                      <div className="min-w-0 px-4 py-5 sm:px-6">

                       
                        <div className="mb-2">
                          <span className="relative inline-block pb-1 text-xs font-semibold text-indigo-900">
                            {meta.label}

                            <span className="absolute bottom-0 left-0 h-[1.5px] w-full bg-indigo-900" />
                          </span>
                        </div>

                       
                        <h2 className="font-display text-base font-bold leading-7 text-indigo-950 transition-colors duration-200 group-hover:text-indigo-800 sm:text-lg">
                          {notice.title}
                        </h2>

                        
                        <p className="mt-1.5 whitespace-pre-line text-sm leading-6 text-slate-600">
                          {notice.body}
                        </p>
                      </div>

                     
                      <div className="hidden items-center justify-center border-l border-slate-100 md:flex">
                        <FaArrowRight className="text-xs text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-indigo-700" />
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        
        {!loading && notices.length > 0 && (
          <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <FaBullhorn className="text-amber-500" />

              <span>
                সর্বশেষ বিজ্ঞপ্তিগুলো এখানে প্রকাশ করা হয়
              </span>
            </div>

            <span className="hidden sm:block">
              {new Intl.NumberFormat("bn-BD").format(
                notices.length
              )}
              নোটিশ
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

