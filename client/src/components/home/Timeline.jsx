import { motion } from "framer-motion";
import SectionTitle from "../SectionTitle.jsx";
import Reveal from "../Reveal.jsx";
import { journey } from "../../data/site.js";

export default function Timeline() {
  return (
    <section className="relative overflow-hidden bg-[#f8f9fc] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <Reveal>
          <SectionTitle
            badge="ইতিহাস"
            title="আমাদের পথচলা"
            text="বছরের পর বছর ধরে মহল্লাবাসীর সহযোগিতায় গড়ে ওঠা এই প্রতিষ্ঠানের সংক্ষিপ্ত ইতিহাস।"
          />
        </Reveal>

        
        <div className="relative mx-auto mt-12 max-w-4xl">
          
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-slate-200 md:block" />

          
          <div className="absolute bottom-0 left-3 top-0 w-px bg-slate-200 md:hidden" />

          <div>
            {journey.map((item, index) => {
              const isRight = index % 2 === 0;

              return (
                <Reveal
                  key={item.year}
                  from={isRight ? "right" : "left"}
                  delay={index * 0.06}
                  className="relative"
                >
                  <div className="relative grid grid-cols-1 md:grid-cols-2">
                    
                    <div className="absolute left-3 top-5 z-10 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 280,
                          damping: 20,
                        }}
                        className="block size-3 rounded-full border-2 border-[#f8f9fc] bg-indigo-900 shadow-[0_0_0_1px_#cbd5e1]"
                      />
                    </div>

                    
                    {!isRight && (
                      <div className="border-b border-slate-200/70 py-6 pl-10 pr-0 md:border-b-0 md:py-7 md:pr-12 md:text-right">
                        <TimelineContent item={item} align="right" />
                      </div>
                    )}

                    
                    {isRight && <div className="hidden md:block" />}

                    
                    {isRight && (
                      <div className="border-b border-slate-200/70 py-6 pl-10 md:border-b-0 md:py-7 md:pl-12">
                        <TimelineContent item={item} align="left" />
                      </div>
                    )}

                    
                    {!isRight && <div className="hidden md:block" />}
                  </div>
                </Reveal>
              );
            })}
          </div>

         
          <Reveal delay={0.2}>
            <div className="relative mt-2 flex items-center justify-center">
              <div className="absolute left-3 md:left-1/2 md:-translate-x-1/2">
                <span className="block size-2 rounded-full border border-slate-300 bg-[#f8f9fc]" />
              </div>

              <span className="ml-10 font-display text-xs font-medium text-slate-400 md:ml-0">
                পথচলা অব্যাহত
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TimelineContent({ item, align }) {
  const isRight = align === "right";

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      className="group"
    >
      {/* Year */}
      <div
        className={`flex items-center gap-2 ${
          isRight ? "md:justify-end" : "md:justify-start"
        }`}
      >
        <motion.span
          variants={{
            rest: {
              color: "#4338ca",
            },
            hover: {
              color: "#b45309",
            },
          }}
          transition={{ duration: 0.25 }}
          className="font-display text-lg font-bold tracking-wide sm:text-xl"
        >
          {item.year}
        </motion.span>
      </div>

      {/* Title */}
      <motion.h3
        variants={{
          rest: {
            x: 0,
          },
          hover: {
            x: isRight ? -3 : 3,
          },
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
        className="mt-1 font-display text-lg font-bold tracking-tight text-indigo-950 sm:text-xl"
      >
        {item.title}
      </motion.h3>

      {/* Description */}
      <p
        className={`mt-1.5 max-w-md text-sm leading-6 text-slate-500 ${
          isRight ? "ml-auto" : ""
        }`}
      >
        {item.text}
      </p>
    </motion.div>
  );
}