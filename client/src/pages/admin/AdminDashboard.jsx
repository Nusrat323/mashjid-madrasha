
import { motion } from "framer-motion";
import {
  FaDonate,
  FaCalendarAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaUsers,
  FaEnvelopeOpenText,
} from "react-icons/fa";

import Loader from "../../components/Loader.jsx";
import StatusBadge from "../../components/StatusBadge.jsx";
import useFetch from "../../hooks/useFetch.js";
import {
  formatDate,
  formatNumber,
  formatTaka,
  methodLabel,
  monthName,
  purposeLabel,
} from "../../lib/format.js";

function Breakdown({ title, rows, labelOf }) {
  const max = Math.max(
    ...rows.map((row) => row.total),
    1
  );

  return (
    <section className="border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <h2 className="font-display text-base font-bold text-indigo-950">
          {title}
        </h2>

        {rows.length > 0 && (
          <span className="text-xs text-slate-400">
            মোট {rows.length}টি
          </span>
        )}
      </div>

      {rows.length === 0 ? (
        <p className="px-6 py-8 text-sm text-slate-500">
          এখনো কোনো সম্পন্ন দান নেই।
        </p>
      ) : (
        <div className="divide-y divide-slate-100">
          {rows.map((row) => (
            <div
              key={row._id}
              className="px-6 py-4 transition-colors hover:bg-slate-50/60"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-slate-600">
                  {labelOf(row._id)}
                </span>

                <span className="shrink-0 text-sm font-semibold text-indigo-950">
                  {formatTaka(row.total)}
                </span>
              </div>

              <div className="mt-3 h-1.5 overflow-hidden bg-slate-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(row.total / max) * 100}%`,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="h-full bg-indigo-700"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function AdminDashboard() {
  const { data, loading } = useFetch(
    "/admin/dashboard",
    true
  );

  if (loading || !data) return <Loader />;

  const summary = [
    {
      label: "মোট সংগৃহীত দান",
      value: formatTaka(data.total),
      icon: FaDonate,
      color: "text-emerald-600",
    },
    {
      label: "এই মাসে",
      value: formatTaka(data.monthTotal),
      icon: FaCalendarAlt,
      color: "text-indigo-600",
    },
    {
      label: "সম্পন্ন দান",
      value: formatNumber(data.count),
      icon: FaCheckCircle,
      color: "text-green-600",
    },
    {
      label: "যাচাই বাকি",
      value: formatNumber(data.pending),
      icon: FaHourglassHalf,
      color: "text-amber-600",
    },
    {
      label: "ব্যবহারকারী",
      value: formatNumber(data.users),
      icon: FaUsers,
      color: "text-sky-600",
    },
    {
      label: "নতুন বার্তা",
      value: formatNumber(data.unreadMessages),
      icon: FaEnvelopeOpenText,
      color: "text-rose-600",
    },
  ];

  const maxMonth = Math.max(
    ...data.monthly.map((item) => item.total),
    1
  );

  return (
    <div className="space-y-8">

     

      <div>
        

        <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold text-indigo-950">
              ড্যাশবোর্ড
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              মসজিদের দান ও কার্যক্রমের বর্তমান চিত্র
            </p>
          </div>
        </div>
      </div>

      

      <section className="overflow-hidden border border-slate-200 bg-white">
        <div className="grid divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3">
          {summary.map(
            (
              { label, value, icon: Icon, color },
              index
            ) => (
              <motion.div
                key={label}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.04,
                  duration: 0.35,
                }}
                className="group flex min-h-[118px] items-center justify-between gap-5 px-6 py-5 transition-colors hover:bg-slate-50/50"
              >
                <div className="min-w-0">
                  <p className="text-sm text-slate-500">
                    {label}
                  </p>

                  <p className="mt-1 truncate font-display text-xl font-bold text-indigo-950">
                    {value}
                  </p>
                </div>

                <Icon
                  className={`shrink-0 text-xl transition-transform duration-300 group-hover:scale-110 ${color}`}
                />
              </motion.div>
            )
          )}
        </div>
      </section>

      

      <section className="overflow-hidden border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="font-display text-base font-bold text-indigo-950">
              মাসভিত্তিক দান
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              সম্পন্ন দানের পরিমাণের মাসভিত্তিক হিসাব
            </p>
          </div>
        </div>

        {data.monthly.length === 0 ? (
          <p className="px-6 py-10 text-sm text-slate-500">
            এখনো কোনো সম্পন্ন দান নেই।
          </p>
        ) : (
          <div className="overflow-x-auto px-6 py-8">
            <div className="flex h-60 min-w-[620px] items-end gap-4 sm:gap-7">
              {data.monthly.map((item) => {
                const height =
                  (item.total / maxMonth) * 155;

                return (
                  <div
                    key={`${item._id.year}-${item._id.month}`}
                    className="flex h-full min-w-[48px] flex-1 flex-col items-center justify-end"
                  >
                    <span className="mb-2 whitespace-nowrap text-[11px] font-medium text-slate-500">
                      {formatTaka(item.total)}
                    </span>

                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height }}
                      transition={{
                        duration: 0.7,
                        ease: "easeOut",
                      }}
                      className="w-full max-w-14 bg-indigo-700 transition-colors hover:bg-indigo-600"
                    />

                    <span className="mt-3 whitespace-nowrap text-xs text-slate-500">
                      {monthName(
                        item._id.month,
                        item._id.year
                      )}{" "}
                      {String(item._id.year).slice(-2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      

      <div className="grid gap-6 lg:grid-cols-2">
        <Breakdown
          title="পেমেন্ট মাধ্যম"
          rows={data.byMethod}
          labelOf={methodLabel}
        />

        <Breakdown
          title="দানের উদ্দেশ্য"
          rows={data.byPurpose}
          labelOf={purposeLabel}
        />
      </div>

     
      <section className="overflow-hidden border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="font-display text-base font-bold text-indigo-950">
              সাম্প্রতিক দান
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              সর্বশেষ জমা হওয়া দানের রেকর্ড
            </p>
          </div>

          {data.recent.length > 0 && (
            <span className="text-xs font-medium text-slate-400">
              সর্বশেষ {data.recent.length}টি
            </span>
          )}
        </div>

        {data.recent.length === 0 ? (
          <div className="px-6 py-10 text-sm text-slate-500">
            এখনো কোনো দানের রেকর্ড নেই।
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead className="border-b border-slate-100 bg-slate-50/70">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500">
                    দাতা
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold text-slate-500">
                    পরিমাণ
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold text-slate-500">
                    মাধ্যম
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold text-slate-500">
                    তারিখ
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold text-slate-500">
                    অবস্থা
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {data.recent.map((item) => (
                  <tr
                    key={item._id}
                    className="transition-colors hover:bg-slate-50/60"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-indigo-950">
                        {item.donorName}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-semibold text-slate-700">
                      {formatTaka(item.amount)}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {methodLabel(item.method)}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {formatDate(item.createdAt)}
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge
                        status={item.status}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

