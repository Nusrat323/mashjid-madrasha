import { motion } from "framer-motion";
import { FaRegClock } from "react-icons/fa";
import { useSettings } from "../context/SettingsContext.jsx";

const prayers = [
  ["fajr", "ফজর"],
  ["dhuhr", "যোহর"],
  ["asr", "আসর"],
  ["maghrib", "মাগরিব"],
  ["isha", "এশা"],
  ["jummah", "জুমুআ"],
];

export default function PrayerTimes() {
  const { settings } = useSettings();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-indigo-900/10 sm:p-7"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-amber-100 text-amber-600">
          <FaRegClock />
        </span>
        <div>
          <h2 className="font-display text-xl font-bold text-indigo-950">জামাতের সময়সূচি</h2>
          <p className="text-sm text-slate-500">মসজিদ কমিটি নির্ধারিত জামাতের সময়</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {prayers.map(([key, label]) => (
          <motion.div
            key={key}
            whileHover={{ y: -4 }}
            className={`rounded-2xl border p-4 text-center ${
              key === "jummah" ? "border-amber-200 bg-amber-50" : "border-slate-100 bg-slate-50"
            }`}
          >
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-1 font-display text-xl font-bold text-indigo-950">{settings.prayerTimes[key]}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
