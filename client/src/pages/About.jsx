import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBullseye,
  FaHandHoldingHeart,
  FaShieldAlt,
  FaBookOpen,
  FaUsers,
  FaMosque,
  FaArrowRight,
  FaTree,
  FaSmile,
} from "react-icons/fa";

import PageHeader from "../components/PageHeader.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import Reveal from "../components/Reveal.jsx";
import { services } from "../data/site.js";

import mosqueMadrasaImage from "../assets/g1.png";

const values = [
  {
    icon: FaBookOpen,
    title: "দ্বীনি ও নৈতিক শিক্ষা",
    text: "শিশু-কিশোরদের কুরআন শিক্ষা, দ্বীনি জ্ঞান এবং দৈনন্দিন জীবনে ভালো আচরণ ও সুন্দর মূল্যবোধ গড়ে তোলার দিকে গুরুত্ব দেওয়া।",
  },
  {
    icon: FaUsers,
    title: "একসাথে বেড়ে ওঠা",
    text: "শিক্ষার্থীদের মধ্যে পারস্পরিক সহযোগিতা, বন্ধুত্ব, শৃঙ্খলা ও একে অন্যের প্রতি সম্মানবোধ তৈরি করার একটি সুন্দর পরিবেশ।",
  },
  {
    icon: FaSmile,
    title: "আনন্দ ও অংশগ্রহণ",
    text: "শিক্ষার পাশাপাশি শিশুদের স্বাভাবিক আনন্দ, খেলাধুলা, বিনোদন এবং বিভিন্ন আনন্দঘন আয়োজনের মধ্য দিয়ে প্রাণবন্ত পরিবেশ তৈরি করা।",
  },
];

export default function About() {
  return (
    <>
      <PageHeader
        title="আমাদের সম্পর্কে"
        text="পাইকপাড়া কাজী আলফাজউদ্দীন জামে মসজিদ ও মাদ্রাসার পরিচয়, শিক্ষা ও সামাজিক ভূমিকা।"
      />

      
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
         
          <Reveal from="left">
            <div className="relative mx-auto w-full max-w-lg">
              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.3)]">
                <img
                  src={mosqueMadrasaImage}
                  alt="পাইকপাড়া কাজী আলফাজউদ্দীন জামে মসজিদ ও মাদ্রাসা"
                  className="h-[360px] w-full object-cover transition duration-700 hover:scale-[1.025] sm:h-[420px]"
                />

                <div className="absolute inset-x-0 bottom-0 rounded-b-[2rem] bg-linear-to-t from-black/70 via-black/25 to-transparent p-6 pt-24">
                  <p className="text-sm font-medium text-amber-300">
                    পাইকপাড়া কাজী আলফাজউদ্দীন জামে মসজিদ
                  </p>

                  <p className="mt-1 max-w-md text-lg font-semibold leading-snug text-white">
                    ইবাদত, শিক্ষা ও সুন্দরভাবে বেড়ে ওঠার একটি পরিচিত স্থান
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

         
          <Reveal from="right">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                আমাদের পরিচয়
              </span>

              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-indigo-950 sm:text-4xl">
                শুধু পড়াশোনা নয়, সুন্দরভাবে বেড়ে ওঠার একটি পরিবেশ
              </h2>

              <div className="mt-6 space-y-4 text-[17px] leading-8 text-slate-600">
                <p>
                  পাইকপাড়া কাজী আলফাজউদ্দীন জামে মসজিদ ও মাদ্রাসা আমাদের
                  এলাকার ধর্মীয় শিক্ষা, ইবাদত এবং পারস্পরিক সম্প্রীতির সঙ্গে
                  জড়িত একটি পরিচিত প্রতিষ্ঠান। এখানে শিশু-কিশোরদের জন্য
                  দ্বীনি শিক্ষার পাশাপাশি শৃঙ্খলা, আদব ও সুন্দর আচরণের চর্চার
                  সুযোগ রয়েছে।
                </p>

                <p>
                  আমরা মনে করি, শিশুদের বেড়ে ওঠা শুধু বইয়ের পড়াশোনার
                  মধ্যেই সীমাবদ্ধ নয়। তাদের শেখার পাশাপাশি আনন্দ করা,
                  একসঙ্গে সময় কাটানো, খেলাধুলা করা এবং প্রকৃতির কাছাকাছি
                  যাওয়ারও প্রয়োজন রয়েছে।
                </p>

                <p>
                  তাই সময় ও সুযোগ অনুযায়ী শিশুদের জন্য বিভিন্ন আনন্দঘন
                  আয়োজন, খেলাধুলা, বিনোদনমূলক কার্যক্রম, পিকনিক বা
                  ভ্রমণের মতো উদ্যোগ তাদের মধ্যে বন্ধুত্ব, আত্মবিশ্বাস ও
                  পারস্পরিক সহযোগিতার মানসিকতা গড়ে তুলতে সহায়তা করে।
                </p>

                <p>
                  আমাদের উদ্দেশ্য এমন একটি পরিবেশ ধরে রাখা, যেখানে একজন
                  শিশু জ্ঞান অর্জনের পাশাপাশি ভালো মানুষ হওয়ার মূল্যবোধও
                  শিখবে এবং আনন্দের সঙ্গে নিজের শৈশবকে উপভোগ করতে পারবে।
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/donate"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-900 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-900/15 transition hover:-translate-y-0.5 hover:bg-indigo-800"
                >
                  <FaHandHoldingHeart />
                  সহযোগিতা করুন
                </Link>

                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-900"
                >
                  ছবি দেখুন
                  <FaArrowRight className="text-sm" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

     
      <section className="border-y border-slate-200 bg-slate-50/70 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Reveal from="left">
              <div>
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-600">
                  শিশু-কিশোরদের জন্য
                </span>

                <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-indigo-950 sm:text-4xl">
                  শেখার সঙ্গে আনন্দেরও প্রয়োজন
                </h2>

                <p className="mt-5 leading-8 text-slate-600">
                  একটি সুন্দর শৈশবের জন্য শিক্ষা, শৃঙ্খলা ও নৈতিকতার পাশাপাশি
                  আনন্দ ও সামাজিক মেলামেশারও প্রয়োজন। সেই বিষয়টি মাথায়
                  রেখে শিশুদের জন্য একটি প্রাণবন্ত ও আন্তরিক পরিবেশ তৈরি
                  করাই আমাদের অন্যতম প্রত্যাশা।
                </p>

                <div className="mt-7 flex items-center gap-3 text-sm font-medium text-indigo-900">
                  <span className="grid size-10 place-items-center rounded-full bg-amber-100 text-amber-600">
                    <FaTree />
                  </span>
                  <span>
                    শিক্ষা, বন্ধুত্ব, আনন্দ ও সুন্দর স্মৃতির সমন্বয়
                  </span>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2">
              <Reveal delay={0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
                >
                  <div className="grid size-12 place-items-center rounded-xl bg-indigo-50 text-xl text-indigo-900">
                    <FaBookOpen />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-indigo-950">
                    শিক্ষা ও আদব
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    কুরআন পাঠ, দ্বীনি জ্ঞান এবং দৈনন্দিন জীবনে শিষ্টাচার ও
                    ভালো আচরণের গুরুত্ব শেখার সুযোগ।
                  </p>
                </motion.div>
              </Reveal>

              <Reveal delay={0.2}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
                >
                  <div className="grid size-12 place-items-center rounded-xl bg-amber-50 text-xl text-amber-600">
                    <FaSmile />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-indigo-950">
                    আনন্দ ও স্মৃতি
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    পিকনিক, ভ্রমণ, খেলাধুলা ও বিভিন্ন আনন্দঘন আয়োজনের
                    মাধ্যমে শিশুদের জন্য সুন্দর সময় কাটানোর সুযোগ।
                  </p>
                </motion.div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <SectionTitle
          title="আমাদের কাছে যে বিষয়গুলো গুরুত্বপূর্ণ"
          text="একটি শিশুর সুন্দর বিকাশের জন্য শিক্ষা ও পরিবেশ—দুটিকেই আমরা গুরুত্ব দিই।"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-indigo-50 text-lg text-indigo-900">
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
      </section>

      
      <section className="bg-indigo-950 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
              আমাদের কার্যক্রম
            </span>

            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              মসজিদ ও মাদ্রাসাকে ঘিরে বিভিন্ন উদ্যোগ
            </h2>

            <p className="mt-4 leading-7 text-indigo-200">
              নিয়মিত শিক্ষা ও ধর্মীয় কার্যক্রমের পাশাপাশি প্রয়োজন ও
              সুযোগ অনুযায়ী শিশু-কিশোর এবং মহল্লার মানুষের জন্য বিভিন্ন
              উদ্যোগ নেওয়া হয়।
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {services.map(({ icon: Icon, title, text }, index) => (
              <Reveal
                key={title}
                from={index % 2 === 0 ? "left" : "right"}
              >
                <motion.div
                  whileHover={{ x: 4 }}
                  className="group flex gap-5 rounded-2xl border border-white/10 bg-white/6 p-6 backdrop-blur-sm transition hover:bg-white/10"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-amber-400 text-lg text-indigo-950">
                    <Icon />
                  </span>

                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      {title}
                    </h3>

                    <p className="mt-2 leading-7 text-indigo-200">
                      {text}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

     
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-amber-50 px-6 py-12 text-center sm:px-12">
            <div className="absolute -right-16 -top-16 size-40 rounded-full bg-amber-100" />
            <div className="absolute -bottom-20 -left-10 size-40 rounded-full bg-white/70" />

            <div className="relative mx-auto max-w-2xl">
              <FaHandHoldingHeart className="mx-auto text-3xl text-amber-600" />

              <h2 className="mt-4 font-display text-2xl font-bold text-indigo-950 sm:text-3xl">
                এই সুন্দর পরিবেশ ধরে রাখতে আপনার সহযোগিতা গুরুত্বপূর্ণ
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                মসজিদ ও মাদ্রাসার শিক্ষা, রক্ষণাবেক্ষণ এবং বিভিন্ন
                প্রয়োজনীয় কার্যক্রম এগিয়ে নিতে আপনার সামর্থ্য অনুযায়ী
                সহযোগিতা করতে পারেন।
              </p>

              <Link
                to="/donate"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-900 px-7 py-3.5 font-semibold text-white transition hover:bg-indigo-800"
              >
                দান করুন
                <FaArrowRight className="text-sm" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}