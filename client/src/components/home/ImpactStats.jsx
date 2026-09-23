import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import Reveal from "../Reveal.jsx";
import { statHighlights } from "../../data/site.js";

function StatValue({ item }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const [display, setDisplay] = useState(
    item.isYear ? item.value : 0
  );

  useEffect(() => {
    if (!inView || item.isYear) return;

    const controls = animate(0, item.value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplay(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [inView, item]);

  return (
    <span ref={ref}>
      {display.toLocaleString("bn-BD", {
        useGrouping: false,
      })}
      {item.suffix}
    </span>
  );
}

export default function ImpactStats() {
  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-[#fbfaf7] py-16 sm:py-20">
     
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #1e1b4b 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #1e1b4b 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <Reveal>
          <div className="mb-12 text-center sm:mb-14">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-amber-700/40 sm:w-16" />

              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
                আমাদের পথচলা
              </span>

              <span className="h-px w-10 bg-amber-700/40 sm:w-16" />
            </div>

            <h2 className="font-display text-2xl font-bold tracking-tight text-indigo-950 sm:text-3xl">
              শিক্ষা, সেবা ও ঐতিহ্যের ধারাবাহিকতা
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              দ্বীনি শিক্ষা, নৈতিকতা ও সমাজসেবার মাধ্যমে আমাদের
              দীর্ঘদিনের পথচলার কিছু উল্লেখযোগ্য তথ্য।
            </p>
          </div>
        </Reveal>

        
        <div className="relative grid grid-cols-2 sm:grid-cols-4">
          {statHighlights.map((item, index) => (
            <Reveal
              key={item.label}
              delay={index * 0.1}
              className={`
                relative px-5 py-7 text-center
                sm:px-8 sm:py-2

                ${
                  index < 2
                    ? "border-b border-slate-200 sm:border-b-0"
                    : ""
                }

                ${
                  index % 2 === 0
                    ? "border-r border-slate-200"
                    : ""
                }

                sm:border-r sm:border-slate-200

                ${index === 3 ? "sm:border-r-0" : ""}
              `}
            >
              
              <div className="mb-4 flex items-center justify-center gap-2">
                <span className="h-1 w-1 rounded-full bg-amber-700" />

                <span className="h-px w-7 bg-amber-700/35" />

                <span className="h-1 w-1 rounded-full bg-amber-700" />
              </div>

              
              <p className="font-display text-4xl font-bold tracking-tight text-indigo-950 sm:text-5xl">
                <StatValue item={item} />
              </p>

             
              <p className="mt-3 text-sm font-medium leading-6 text-slate-600 sm:text-base">
                {item.label}
              </p>
            </Reveal>
          ))}
        </div>

       
        <Reveal delay={0.45}>
          <div className="mx-auto mt-12 flex items-center justify-center gap-3 sm:mt-14">
            <span className="h-px w-16 bg-slate-200 sm:w-24" />

            <span className="flex h-2 w-2 rotate-45 border border-amber-700/50" />

            <span className="h-px w-16 bg-slate-200 sm:w-24" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}