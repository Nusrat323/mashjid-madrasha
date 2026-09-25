import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHandHoldingHeart, FaArrowRight } from "react-icons/fa";
import Pattern from "../Pattern.jsx";
import { site } from "../../data/site.js";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[640px] items-center overflow-hidden bg-linear-to-br from-indigo-900 via-indigo-950 to-slate-900 pb-44 pt-20 lg:min-h-[720px]">
      <motion.img
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
        src={site.bannerImage}
        alt="পাইকপাড়া কাজীবাড়ী মসজিদ ও মাদ্রাসা"
        className="absolute inset-0 -z-20 size-full object-cover"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-indigo-950/90 via-indigo-950/55 to-indigo-950/5" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-linear-to-t from-indigo-950/80 to-transparent" />
      <Pattern className="-z-10 text-white/5" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
  variants={container}
  initial="hidden"
  animate="show"
  className="max-w-2xl"
>
  <motion.div
    variants={item}
    className="flex items-center gap-3 text-sm font-medium tracking-wide text-amber-200"
  >
    <span className="h-px w-8 bg-amber-300/60" />

    <span className="font-display">
      বিসমিল্লাহির রাহমানির রাহীম
    </span>

    <span className="h-px w-8 bg-amber-300/60" />
  </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-4xl font-bold leading-snug text-white sm:text-5xl lg:text-6xl lg:leading-snug"
          >
           পাইকপাড়া কাজী আলফাজউদ্দীন জামে মসজিদ
          </motion.h1>

          <motion.p variants={item} className="mt-5 max-w-xl text-lg text-indigo-100 sm:text-xl">
            ঈমান, ইলম ও খিদমতের একটি প্রাণকেন্দ্র। নামাজ, কুরআন শিক্ষা ও সমাজসেবার এই আঙিনায় আপনাকে স্বাগতম।
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-lg font-semibold text-indigo-950 shadow-xl shadow-amber-500/20 transition hover:-translate-y-0.5 hover:bg-amber-300"
            >
              <FaHandHoldingHeart /> দান করুন
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-lg font-medium text-white backdrop-blur transition hover:bg-white/20"
            >
              মাদ্রাসা সম্পর্কে জানুন <FaArrowRight className="text-sm" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
