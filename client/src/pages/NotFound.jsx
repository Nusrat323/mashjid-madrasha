import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center px-4 text-center">
      <div>
        <motion.p
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="font-display text-8xl font-bold text-indigo-900"
        >
          ৪০৪
        </motion.p>
        <h1 className="mt-4 font-display text-2xl font-bold text-indigo-950">পাতাটি খুঁজে পাওয়া যায়নি</h1>
        <p className="mt-2 text-slate-600">আপনি যে ঠিকানায় যেতে চাইছেন সেটি হয়তো সরানো হয়েছে বা ভুল লেখা হয়েছে।</p>
        <Link to="/" className="mt-7 inline-block rounded-xl bg-indigo-900 px-7 py-3.5 font-semibold text-white transition hover:bg-indigo-800">
          হোমে ফিরে যান
        </Link>
      </div>
    </section>
  );
}
