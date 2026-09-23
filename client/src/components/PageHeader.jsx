import { motion } from "framer-motion";
import Pattern from "./Pattern.jsx";

export default function PageHeader({ title, text }) {
  return (
    <section className="relative overflow-hidden border-b border-indigo-100 bg-linear-to-b from-indigo-50 to-white py-16 sm:py-20">
      <Pattern className="text-indigo-300/25" />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-16 -top-16 size-64 rounded-full bg-amber-300/30 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl font-bold leading-snug text-indigo-950 sm:text-5xl"
        >
          {title}
        </motion.h1>
        {text && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 max-w-2xl text-lg text-slate-600"
          >
            {text}
          </motion.p>
        )}
      </div>
    </section>
  );
}
