import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaExclamationCircle } from "react-icons/fa";

const results = {
  success: {
    icon: FaCheckCircle,
    tone: "bg-sky-100 text-sky-600",
    title: "আপনার দান সফলভাবে সম্পন্ন হয়েছে",
    text: "জাযাকাল্লাহু খাইরান। আল্লাহ আপনার দান কবুল করুন এবং উত্তম প্রতিদান দিন।",
  },
  cancelled: {
    icon: FaExclamationCircle,
    tone: "bg-amber-100 text-amber-600",
    title: "পেমেন্ট বাতিল করা হয়েছে",
    text: "আপনি পেমেন্ট সম্পন্ন করেননি। চাইলে আবার চেষ্টা করতে পারেন।",
  },
  failed: {
    icon: FaTimesCircle,
    tone: "bg-rose-100 text-rose-600",
    title: "পেমেন্ট সম্পন্ন হয়নি",
    text: "কোনো সমস্যার কারণে পেমেন্ট সম্পন্ন হয়নি। আপনার একাউন্ট থেকে টাকা কাটা হয়ে থাকলে আমাদের সঙ্গে যোগাযোগ করুন।",
  },
};

export default function DonateResult() {
  const [params] = useSearchParams();
  const result = results[params.get("status")] || results.failed;
  const Icon = result.icon;

  return (
    <section className="grid min-h-[70vh] place-items-center px-4 py-16 text-center">
      <div className="max-w-md">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className={`mx-auto grid size-24 place-items-center rounded-full text-5xl ${result.tone}`}
        >
          <Icon />
        </motion.span>
        <h1 className="mt-8 font-display text-3xl font-bold leading-snug text-indigo-950">{result.title}</h1>
        <p className="mt-3 text-lg text-slate-600">{result.text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/dashboard" className="rounded-xl bg-indigo-900 px-6 py-3 font-semibold text-white transition hover:bg-indigo-800">
            আমার দানসমূহ
          </Link>
          <Link to="/donate" className="rounded-xl border border-slate-200 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50">
            আবার দান করুন
          </Link>
        </div>
      </div>
    </section>
  );
}
