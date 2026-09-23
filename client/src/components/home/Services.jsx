import { motion } from "framer-motion";
import SectionTitle from "../SectionTitle.jsx";
import Reveal from "../Reveal.jsx";
import { services } from "../../data/site.js";

export default function Services() {
  return (
    <section className="relative overflow-hidden bg-[#fbfaf7] py-24 sm:py-28">
      
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-indigo-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
       
        <SectionTitle
          badge="আমাদের কার্যক্রম"
          title="ইবাদত, শিক্ষা ও সেবার এক আঙিনা"
          text="মসজিদকে ঘিরে মহল্লার মানুষের জন্য নিয়মিত যেসব আয়োজন চলে।"
        />

        
        <div className="mx-auto mt-14 max-w-5xl">
          {services.map(
            ({ icon: Icon, title, text }, index) => (
              <Reveal
                key={title}
                delay={index * 0.08}
              >
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  className="group relative border-t border-slate-200/80"
                >
                 
                  <motion.div
                    variants={{
                      rest: {
                        opacity: 0,
                        scaleX: 0.96,
                      },
                      hover: {
                        opacity: 1,
                        scaleX: 1,
                      },
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="pointer-events-none absolute inset-0 bg-white shadow-[0_10px_40px_rgba(30,27,75,0.06)]"
                  />

                 
                  <div className="relative flex items-center gap-4 px-3 py-7 sm:gap-7 sm:px-6 sm:py-8">
                   
                    <motion.span
                      variants={{
                        rest: {
                          color: "#cbd5e1",
                        },
                        hover: {
                          color: "#6366f1",
                        },
                      }}
                      className="hidden w-8 shrink-0 font-mono text-xs font-medium sm:block"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </motion.span>

                   
                    <motion.div
                      variants={{
                        rest: {
                          backgroundColor: "#eef2ff",
                          color: "#4338ca",
                          scale: 1,
                        },
                        hover: {
                          backgroundColor: "#1e1b4b",
                          color: "#fbbf24",
                          scale: 1.08,
                        },
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="grid size-12 shrink-0 place-items-center rounded-xl text-lg sm:size-14"
                    >
                      <Icon />
                    </motion.div>

                    
                    <div className="min-w-0 flex-1">
                      <motion.h3
                        variants={{
                          rest: {
                            x: 0,
                          },
                          hover: {
                            x: 5,
                          },
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        className="font-display text-lg font-bold tracking-tight text-indigo-950 sm:text-xl"
                      >
                        {title}
                      </motion.h3>

                      <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500 sm:text-[15px]">
                        {text}
                      </p>
                    </div>

                    
                    <motion.div
                      variants={{
                        rest: {
                          x: 0,
                          opacity: 0.35,
                        },
                        hover: {
                          x: 5,
                          opacity: 1,
                        },
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="hidden size-10 shrink-0 place-items-center rounded-full border border-slate-200 text-indigo-900 sm:grid"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        className="size-4"
                      >
                        <path
                          d="M4 10h11M11 5l5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  </div>

                 
                  <motion.div
                    variants={{
                      rest: {
                        scaleX: 0,
                      },
                      hover: {
                        scaleX: 1,
                      },
                    }}
                    transition={{
                      duration: 0.35,
                      ease: "easeOut",
                    }}
                    className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-indigo-700 via-indigo-400 to-amber-400"
                  />
                </motion.div>
              </Reveal>
            )
          )}

          
          <div className="border-t border-slate-200/80" />
        </div>

        
        <Reveal delay={0.4}>
          <div className="mt-10 flex items-center justify-center gap-3 text-center">
            <span className="h-px w-8 bg-slate-300" />

            <span className="text-xs font-medium tracking-wide text-slate-400">
              দ্বীন • শিক্ষা • সমাজসেবা
            </span>

            <span className="h-px w-8 bg-slate-300" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}