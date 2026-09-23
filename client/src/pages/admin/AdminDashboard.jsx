import { motion } from "framer-motion";
import { FaDonate, FaCalendarAlt, FaCheckCircle, FaHourglassHalf, FaUsers, FaEnvelopeOpenText } from "react-icons/fa";
import Loader from "../../components/Loader.jsx";
import StatusBadge from "../../components/StatusBadge.jsx";
import useFetch from "../../hooks/useFetch.js";
import { formatDate, formatNumber, formatTaka, methodLabel, monthName, purposeLabel } from "../../lib/format.js";

function Breakdown({ title, rows, labelOf }) {
  const max = Math.max(...rows.map((row) => row.total), 1);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <h2 className="font-display text-lg font-bold text-indigo-950">{title}</h2>
      {rows.length === 0 && <p className="mt-4 text-sm text-slate-500">এখনো কোনো সম্পন্ন দান নেই।</p>}
      <div className="mt-4 space-y-4">
        {rows.map((row) => (
          <div key={row._id}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-slate-600">{labelOf(row._id)}</span>
              <span className="font-semibold text-indigo-950">{formatTaka(row.total)}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(row.total / max) * 100}%` }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="h-full rounded-full bg-linear-to-r from-indigo-600 to-amber-400"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { data, loading } = useFetch("/admin/dashboard", true);

  if (loading || !data) return <Loader />;

  const cards = [
    { label: "মোট সংগৃহীত দান", value: formatTaka(data.total), icon: FaDonate, tone: "bg-indigo-100 text-indigo-700" },
    { label: "এই মাসের দান", value: formatTaka(data.monthTotal), icon: FaCalendarAlt, tone: "bg-amber-100 text-amber-700" },
    { label: "সম্পন্ন দানের সংখ্যা", value: formatNumber(data.count), icon: FaCheckCircle, tone: "bg-sky-100 text-sky-700" },
    { label: "যাচাই বাকি", value: formatNumber(data.pending), icon: FaHourglassHalf, tone: "bg-rose-100 text-rose-700" },
    { label: "নিবন্ধিত ব্যবহারকারী", value: formatNumber(data.users), icon: FaUsers, tone: "bg-violet-100 text-violet-700" },
    { label: "নতুন বার্তা", value: formatNumber(data.unreadMessages), icon: FaEnvelopeOpenText, tone: "bg-slate-200 text-slate-700" },
  ];

  const maxMonth = Math.max(...data.monthly.map((item) => item.total), 1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-indigo-950">ড্যাশবোর্ড</h1>
        <p className="text-sm text-slate-500">মসজিদের দান ও কার্যক্রমের সারসংক্ষেপ</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(({ label, value, icon: Icon, tone }, index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-6"
          >
            <span className={`grid size-14 shrink-0 place-items-center rounded-2xl text-xl ${tone}`}>
              <Icon />
            </span>
            <div className="min-w-0">
              <p className="text-sm text-slate-500">{label}</p>
              <p className="truncate font-display text-2xl font-bold text-indigo-950">{value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        <h2 className="font-display text-lg font-bold text-indigo-950">মাসভিত্তিক সম্পন্ন দান</h2>
        {data.monthly.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">এখনো কোনো সম্পন্ন দান নেই।</p>
        ) : (
          <div className="mt-6 flex h-52 items-end gap-3 sm:gap-6">
            {data.monthly.map((item) => (
              <div key={`${item._id.year}-${item._id.month}`} className="flex flex-1 flex-col items-center justify-end gap-2">
                <span className="text-xs text-slate-500">{formatTaka(item.total)}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: (item.total / maxMonth) * 140 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="w-full max-w-16 rounded-t-xl bg-linear-to-t from-indigo-800 to-indigo-400"
                />
                <span className="text-xs font-medium text-slate-600">
                  {monthName(item._id.month, item._id.year)} {String(item._id.year).slice(-2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Breakdown title="মাধ্যম অনুযায়ী" rows={data.byMethod} labelOf={methodLabel} />
        <Breakdown title="উদ্দেশ্য অনুযায়ী" rows={data.byPurpose} labelOf={purposeLabel} />
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
        <h2 className="p-6 pb-4 font-display text-lg font-bold text-indigo-950">সাম্প্রতিক দান</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="px-6 py-3 font-medium">দাতা</th>
                <th className="px-6 py-3 font-medium">পরিমাণ</th>
                <th className="px-6 py-3 font-medium">মাধ্যম</th>
                <th className="px-6 py-3 font-medium">তারিখ</th>
                <th className="px-6 py-3 font-medium">অবস্থা</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.recent.map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4 font-medium text-indigo-950">{item.donorName}</td>
                  <td className="px-6 py-4">{formatTaka(item.amount)}</td>
                  <td className="px-6 py-4 text-sm">{methodLabel(item.method)}</td>
                  <td className="px-6 py-4 text-sm">{formatDate(item.createdAt)}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={item.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
