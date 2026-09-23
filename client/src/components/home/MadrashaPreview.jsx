
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import SectionTitle from "../SectionTitle.jsx";
import Reveal from "../Reveal.jsx";
import Pattern from "../Pattern.jsx";
import { departments } from "../../data/site.js";

export default function MadrashaPreview() {
  return (
    <section className="relative overflow-hidden bg-indigo-50/70 py-24 sm:py-28">
     
      <div className="pointer-events-none absolute inset-0">
        <Pattern className="text-indigo-300/20" />

        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-white/50 blur-3xl" />

        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-amber-100/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <Reveal>
          <SectionTitle
            badge="মাদ্রাসা"
            title="কুরআনের আলোয় গড়ে উঠুক আগামী প্রজন্ম"
            text="মসজিদ সংলগ্ন মাদ্রাসায় শিশুরা কুরআন শেখার পাশাপাশি আদব, আখলাক ও দ্বীনি জীবনের ভিত্তি গড়ে তোলে।"
          />
        </Reveal>

        
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:gap-5">
          {departments.map(
            ({ icon: Icon, title, text }, index) => (
              <Reveal
                key={title}
                from={index % 2 === 0 ? "left" : "right"}
                delay={index * 0.08}
              >
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative flex h-full gap-4 overflow-hidden rounded-[20px] border border-indigo-100/80 bg-white p-5 shadow-[0_6px_24px_rgba(30,27,75,0.035)] transition-shadow duration-300 hover:shadow-[0_14px_35px_rgba(30,27,75,0.08)] sm:p-5.5"
                >
                  
                  <div className="pointer-events-none absolute -right-14 -top-14 size-32 rounded-full bg-indigo-100/50 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                 
                  <span className="absolute right-5 top-4 font-mono text-[10px] font-medium tracking-wider text-slate-200 transition-colors duration-300 group-hover:text-indigo-200">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  
                  <motion.span
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.25 }}
                    className="relative grid size-12 shrink-0 place-items-center rounded-[14px] bg-indigo-50 text-xl text-indigo-700 transition-all duration-300 group-hover:bg-indigo-950 group-hover:text-amber-300"
                  >
                    <Icon />
                  </motion.span>

                  
                  <div className="relative min-w-0 pr-4">
                    <h3 className="font-display text-lg font-bold tracking-tight text-indigo-950 transition-colors duration-300 group-hover:text-indigo-800 sm:text-xl">
                      {title}
                    </h3>

                    <p className="mt-1.5 text-sm leading-6 text-slate-500 sm:text-[14px]">
                      {text}
                    </p>

                    
                    <div className="mt-3 flex items-center gap-2">
                      <span className="h-[2px] w-6 rounded-full bg-indigo-300 transition-all duration-300 group-hover:w-10 group-hover:bg-indigo-700" />

                      <span className="size-1.5 rotate-45 bg-amber-400 opacity-70" />
                    </div>
                  </div>

                  
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-indigo-700 to-amber-400 transition-all duration-500 group-hover:w-full" />
                </motion.div>
              </Reveal>
            )
          )}
        </div>

       
        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-indigo-200/70 pt-7 sm:flex-row">
            <div className="text-center sm:text-left">
              <p className="font-display text-lg font-bold text-indigo-950">
                দ্বীনি শিক্ষার পথচলা সম্পর্কে আরও জানুন
              </p>

              <p className="mt-1 text-sm text-slate-500">
                মাদ্রাসার শিক্ষা কার্যক্রম ও পরিবেশ সম্পর্কে বিস্তারিত দেখুন।
              </p>
            </div>

            <Link
              to="/madrasha"
              className="group inline-flex items-center gap-3 rounded-xl bg-indigo-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-900 hover:shadow-xl hover:shadow-indigo-950/15"
            >
              <span>বিস্তারিত দেখুন</span>

              <span className="grid size-7 place-items-center rounded-full bg-white/10 transition-all duration-300 group-hover:bg-amber-300 group-hover:text-indigo-950">
                <FaArrowRight className="text-[10px] transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
