import { Link } from "react-router-dom";
import { FaHandHoldingHeart, FaQuoteLeft } from "react-icons/fa";
import Reveal from "../Reveal.jsx";
import Pattern from "../Pattern.jsx";
import CountUp from "../CountUp.jsx";
import useFetch from "../../hooks/useFetch.js";
import { formatTaka } from "../../lib/format.js";

export default function DonationBanner() {
  const { data } = useFetch("/donations/stats");

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <Reveal
        from="zoom"
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-linear-to-br from-indigo-900 via-indigo-800 to-indigo-950 p-8 text-white sm:p-14"
      >
        <Pattern className="text-white/5" />
        <div className="absolute -right-20 -top-20 size-80 rounded-full bg-amber-400/25 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <FaQuoteLeft className="text-3xl text-amber-400" />
            <p className="mt-4 font-display text-2xl font-semibold leading-relaxed sm:text-3xl sm:leading-relaxed">
              যে ব্যক্তি আল্লাহর সন্তুষ্টির উদ্দেশ্যে মসজিদ নির্মাণ করে, আল্লাহ তার জন্য জান্নাতে অনুরূপ একটি ঘর নির্মাণ করেন।
            </p>
            <p className="mt-3 text-indigo-200">— সহীহ বুখারি ও সহীহ মুসলিম</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-lg font-semibold text-indigo-950 transition hover:-translate-y-0.5 hover:bg-amber-300"
              >
                <FaHandHoldingHeart /> এখনই দান করুন
              </Link>
              <Link
                to="/about"
                className="rounded-xl border border-white/30 px-7 py-3.5 text-lg font-medium transition hover:bg-white/10"
              >
                আমাদের সম্পর্কে
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
              <p className="text-indigo-200">এ পর্যন্ত সংগৃহীত দান</p>
              <p className="mt-1 font-display text-3xl font-bold text-amber-300">
                <CountUp value={data?.total || 0} format={formatTaka} />
              </p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
              <p className="text-indigo-200">সম্পন্ন দানের সংখ্যা</p>
              <p className="mt-1 font-display text-3xl font-bold text-amber-300">
                <CountUp value={data?.count || 0} />
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
