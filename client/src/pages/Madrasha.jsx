
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHandHoldingHeart,
  FaPhoneAlt,
  FaQuran,
  FaBookOpen,
  FaUserGraduate,
  FaMosque,
  FaHeart,
} from "react-icons/fa";

import SectionTitle from "../components/SectionTitle.jsx";
import Reveal from "../components/Reveal.jsx";
import Pattern from "../components/Pattern.jsx";

import { departments } from "../data/site.js";
import madrashaImage from "../assets/g1.png";
import madrashaImage2 from "../assets/g10.JPG";

export default function Madrasha() {
  return (
    <>
      
      <section className="relative overflow-hidden bg-slate-100">
        <div className="mx-auto grid max-w-7xl lg:min-h-[480px] lg:grid-cols-2">
          
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative order-1 h-[300px] overflow-hidden sm:h-[380px] lg:order-2 lg:h-auto"
          >
            <img
              src={madrashaImage}
              alt="পাইকপাড়া কাজী আলফাজউদ্দীন জামে মসজিদ ও মাদ্রাসা"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/30 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-slate-100/20" />
          </motion.div>

          
          <div className="order-2 flex items-center px-5 py-14 sm:px-8 sm:py-16 lg:order-1 lg:px-12 lg:py-20">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-xl"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
                দ্বীনি শিক্ষা
              </p>

              <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-indigo-950 sm:text-5xl">
                মাদ্রাসা
              </h1>

              <div className="mt-5 h-1 w-12 rounded-full bg-amber-400" />

              <p className="mt-6 text-lg leading-8 text-slate-600">
                কুরআন ও দ্বীনি শিক্ষার মাধ্যমে জ্ঞান, নৈতিকতা ও সুন্দর
                চরিত্র গঠনের একটি শিক্ষামূলক পরিবেশ।
              </p>

              <p className="mt-4 text-base leading-7 text-slate-500">
                শিক্ষার্থীদের দ্বীনি জ্ঞান অর্জনের পাশাপাশি দায়িত্বশীল,
                সৎ ও মানবিক মানুষ হিসেবে গড়ে ওঠার পথে সহায়তা করাই
                আমাদের শিক্ষার অন্যতম উদ্দেশ্য।
              </p>

              <Link
                to="/contact"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-900 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-900/20 transition hover:-translate-y-0.5 hover:bg-indigo-800"
              >
                <FaPhoneAlt />
                যোগাযোগ করুন
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <Reveal from="left">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
                মাদ্রাসা সম্পর্কে
              </span>

              <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-indigo-950 sm:text-4xl">
                দ্বীনি শিক্ষার মাধ্যমে সুন্দর ভবিষ্যৎ গড়ার প্রচেষ্টা
              </h2>

              <div className="mt-5 h-1 w-14 rounded-full bg-amber-400" />

              <p className="mt-6 text-lg leading-8 text-slate-600">
                একটি মাদ্রাসা শুধু পাঠদানের স্থান নয়। এটি শিক্ষার্থীদের
                কুরআন, দ্বীনি জ্ঞান, শিষ্টাচার, নৈতিকতা ও মানবিক
                মূল্যবোধ সম্পর্কে শেখার একটি গুরুত্বপূর্ণ পরিবেশ।
              </p>

              <p className="mt-4 text-lg leading-8 text-slate-600">
                আমাদের লক্ষ্য হলো শিক্ষার্থীদের বয়স ও প্রয়োজন অনুযায়ী
                দ্বীনি শিক্ষার সুযোগ তৈরি করা এবং তাদেরকে সুন্দর
                চরিত্র ও দায়িত্বশীলতার পথে এগিয়ে যেতে সহায়তা করা।
              </p>
            </div>
          </Reveal>

          <Reveal from="right">
            <div className="relative overflow-hidden rounded-[2rem]">
              <img
                src={madrashaImage2}
                alt="মাদ্রাসা ও মসজিদের পরিবেশ"
                className="h-[400px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[450px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/40 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>
      </section>

      
      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            badge="শিক্ষার উদ্দেশ্য"
            title="শিক্ষার পাশাপাশি চরিত্র গঠন"
            text="দ্বীনি শিক্ষার মাধ্যমে একজন শিক্ষার্থীর জ্ঞান, আচার-আচরণ ও নৈতিক মূল্যবোধ বিকাশে গুরুত্ব দেওয়া হয়।"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: FaQuran,
                title: "কুরআন শিক্ষা",
                text: "কুরআন পাঠ, তিলাওয়াত ও দ্বীনি জ্ঞান অর্জনের সুযোগ।",
              },
              {
                icon: FaBookOpen,
                title: "দ্বীনি জ্ঞান",
                text: "ইসলামের মৌলিক শিক্ষা ও প্রয়োজনীয় দ্বীনি জ্ঞান সম্পর্কে শেখা।",
              },
              {
                icon: FaHeart,
                title: "নৈতিকতা",
                text: "সততা, শিষ্টাচার, দায়িত্ববোধ ও সুন্দর আচরণের প্রতি গুরুত্ব।",
              },
              {
                icon: FaUserGraduate,
                title: "চরিত্র গঠন",
                text: "শিক্ষার্থীদের সুন্দর ও দায়িত্বশীল মানুষ হিসেবে গড়ে উঠতে সহায়তা করা।",
              },
            ].map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl hover:shadow-indigo-900/10"
                >
                  <span className="grid size-14 place-items-center rounded-2xl bg-indigo-900 text-xl text-amber-300">
                    <Icon />
                  </span>

                  <h3 className="mt-5 font-display text-xl font-bold text-indigo-950">
                    {title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {text}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <SectionTitle
          badge="শিক্ষা বিভাগ"
          title="আমাদের পাঠদান বিভাগসমূহ"
          text="বয়স ও যোগ্যতা অনুযায়ী শিক্ষার্থীরা আলাদা আলাদা বিভাগে পাঠ গ্রহণ করে।"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {departments.map(({ icon: Icon, title, text }, index) => (
            <Reveal
              key={title}
              delay={(index % 2) * 0.12}
            >
              <motion.div
                whileHover={{ y: -6 }}
                className="h-full rounded-3xl border border-slate-200 bg-white p-8 transition-shadow hover:shadow-xl hover:shadow-indigo-900/10"
              >
                <span className="grid size-16 place-items-center rounded-2xl bg-indigo-900 text-2xl text-amber-300">
                  <Icon />
                </span>

                <h3 className="mt-6 font-display text-2xl font-bold text-indigo-950">
                  {title}
                </h3>

                <p className="mt-3 text-lg leading-8 text-slate-600">
                  {text}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      
      <section className="bg-indigo-50 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal from="left">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
                শিক্ষার্থীদের পাশে
              </span>

              <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-indigo-950 sm:text-4xl">
                একটি শিশুর শিক্ষার পথে আপনার সহযোগিতা
              </h2>

              <div className="mt-5 h-1 w-14 rounded-full bg-amber-400" />

              <p className="mt-6 text-lg leading-8 text-slate-600">
                মাদ্রাসার শিক্ষা কার্যক্রম পরিচালনা এবং প্রয়োজনীয়
                শিক্ষা উপকরণ ও সহায়তা নিশ্চিত করতে স্থানীয় মানুষের
                সহযোগিতা গুরুত্বপূর্ণ ভূমিকা রাখতে পারে।
              </p>

              <p className="mt-4 text-lg leading-8 text-slate-600">
                আপনার সামর্থ্য অনুযায়ী সহযোগিতা একজন শিক্ষার্থীর
                পড়াশোনা ও দ্বীনি শিক্ষা চালিয়ে যাওয়ার ক্ষেত্রে
                সহায়ক হতে পারে।
              </p>
            </div>
          </Reveal>

          <Reveal from="right">
            <div className="rounded-[2rem] bg-white p-7 shadow-sm sm:p-9">
              <div className="grid gap-5">
                {[
                  {
                    icon: FaBookOpen,
                    title: "শিক্ষা উপকরণ",
                    text: "কুরআন, বই, খাতা-কলম ও প্রয়োজনীয় শিক্ষা সামগ্রী।",
                  },
                  {
                    icon: FaUserGraduate,
                    title: "শিক্ষার্থীদের সহায়তা",
                    text: "অসহায় ও সুবিধাবঞ্চিত শিক্ষার্থীদের প্রয়োজন অনুযায়ী সহযোগিতা।",
                  },
                  {
                    icon: FaMosque,
                    title: "শিক্ষার পরিবেশ",
                    text: "মাদ্রাসার শিক্ষা কার্যক্রমের জন্য প্রয়োজনীয় পরিবেশ ও সুবিধা উন্নয়ন।",
                  },
                ].map(({ icon: Icon, title, text }) => (
                  <div
                    key={title}
                    className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-indigo-900 text-amber-300">
                      <Icon />
                    </span>

                    <div>
                      <h3 className="font-display text-lg font-bold text-indigo-950">
                        {title}
                      </h3>

                      <p className="mt-1 leading-6 text-slate-600">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      
      <section className="px-4 pb-24 pt-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-900 to-indigo-950 p-8 text-white sm:p-14">
          <Pattern className="text-white/5" />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal from="left">
              <div>
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                  ভর্তি ও তথ্য
                </span>

                <h2 className="mt-3 font-display text-3xl font-bold leading-snug sm:text-4xl">
                  মাদ্রাসা সম্পর্কে আরও জানতে যোগাযোগ করুন
                </h2>

                <p className="mt-5 max-w-xl text-lg leading-8 text-indigo-100">
                  ভর্তি প্রক্রিয়া, প্রয়োজনীয় কাগজপত্র, ক্লাসের
                  সময়সূচি, বিভাগ এবং অন্যান্য তথ্য জানতে মসজিদ
                  কমিটির সঙ্গে সরাসরি যোগাযোগ করুন।
                </p>
              </div>
            </Reveal>

            <Reveal from="right">
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-indigo-950 transition hover:bg-indigo-50"
                >
                  <FaPhoneAlt />
                  যোগাযোগ করুন
                </Link>

                <Link
                  to="/donate?purpose=orphan"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 font-semibold text-indigo-950 transition hover:bg-amber-300"
                >
                  <FaHandHoldingHeart />
                  সহযোগিতা করুন
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
