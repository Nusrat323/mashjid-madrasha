import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import SectionTitle from "../SectionTitle.jsx";
import Reveal from "../Reveal.jsx";
import { faqs } from "../../data/site.js";

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#f8f9fc] py-20 sm:py-24">
      
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-100/40 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-amber-100/30 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `
              linear-gradient(#1e1b4b 1px, transparent 1px),
              linear-gradient(90deg, #1e1b4b 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        
        <Reveal>
          <SectionTitle
            badge="সাধারণ জিজ্ঞাসা"
            title="যা প্রায়ই জিজ্ঞাসা করা হয়"
          />
        </Reveal>

        
        <div className="mx-auto mt-12 overflow-hidden border-y border-slate-200/80 bg-white/70 backdrop-blur-sm">
          {faqs.map((item, index) => {
            const isOpen = open === index;

            return (
              <Reveal key={item.question} delay={index * 0.06}>
                <motion.div
                  initial="rest"
                  animate={isOpen ? "open" : "rest"}
                  className="relative border-b border-slate-200/80 last:border-b-0"
                >
                 
                  <motion.div
                    variants={{
                      rest: { opacity: 0 },
                      open: { opacity: 1 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="pointer-events-none absolute inset-0 bg-indigo-50/60"
                  />

                  
                  <motion.div
                    variants={{
                      rest: {
                        scaleY: 0,
                        opacity: 0,
                      },
                      open: {
                        scaleY: 1,
                        opacity: 1,
                      },
                    }}
                    transition={{
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute bottom-0 left-0 top-0 w-[3px] origin-top bg-gradient-to-b from-indigo-700 via-indigo-500 to-amber-400"
                  />

                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    className="relative flex w-full items-center gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
                  >
                   
                    <motion.span
                      animate={{
                        color: isOpen ? "#6366f1" : "#cbd5e1",
                      }}
                      transition={{ duration: 0.25 }}
                      className="hidden w-7 shrink-0 font-mono text-xs font-medium sm:block"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </motion.span>

                    
                    <motion.span
                      animate={{
                        x: isOpen ? 3 : 0,
                        color: isOpen ? "#312e81" : "#1e1b4b",
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                      className="flex-1 font-display text-base font-semibold leading-7 sm:text-lg"
                    >
                      {item.question}
                    </motion.span>

                   
                    <motion.span
                      animate={{
                        rotate: isOpen ? 180 : 0,
                        backgroundColor: isOpen ? "#1e1b4b" : "#eef2ff",
                        color: isOpen ? "#fcd34d" : "#4338ca",
                      }}
                      transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="grid size-9 shrink-0 place-items-center rounded-full"
                    >
                      <FaChevronDown className="text-[11px]" />
                    </motion.span>
                  </button>

                 
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          height: {
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          },
                          opacity: {
                            duration: 0.25,
                          },
                        }}
                        className="relative overflow-hidden"
                      >
                        <motion.div
                          initial={{ y: -8 }}
                          animate={{ y: 0 }}
                          exit={{ y: -8 }}
                          transition={{
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                          className="px-5 pb-6 sm:px-7 sm:pb-7 sm:pl-[4.5rem]"
                        >
                          <div className="max-w-3xl border-l border-indigo-200 pl-4 sm:pl-5">
                            <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-slate-200" />

            <span className="text-xs font-medium text-slate-400">
              আরও কিছু জানতে আমাদের সাথে যোগাযোগ করুন
            </span>

            <span className="h-px w-8 bg-slate-200" />
          </div>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-col items-center justify-between gap-5 border-y border-indigo-100 bg-white/60 px-5 py-6 backdrop-blur-sm sm:flex-row sm:px-7">
            <div className="text-center sm:text-left">
              <p className="font-display text-base font-bold text-indigo-950 sm:text-lg">
                আরও কিছু জানতে চান?
              </p>

              <p className="mt-1 text-sm text-slate-500">
                মসজিদ, মাদ্রাসা ও ছাত্রাবাস সম্পর্কে বিস্তারিত জানতে আমাদের
                সাথে যোগাযোগ করুন।
              </p>
            </div>

            <Link
              to="/contact"
              className="group inline-flex shrink-0 items-center gap-2.5 rounded-xl bg-indigo-950 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-900"
            >
              <span>যোগাযোগ করুন</span>

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}