import { motion } from "framer-motion";
import { FaQuoteLeft, FaMosque } from "react-icons/fa";
import Reveal from "../Reveal.jsx";
import Pattern from "../Pattern.jsx";

export default function ImamMessage() {
  return (
    <section className="relative overflow-hidden bg-[#fbfaf7] py-24 sm:py-28">
      
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-indigo-100/40 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-amber-100/40 blur-3xl" />

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

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          
          <Reveal from="left" className="lg:col-span-5">
            <div className="relative mx-auto max-w-[430px]">
              
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-[32px] border border-amber-200/70" />
             
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative aspect-[0.92] overflow-hidden rounded-[30px] bg-gradient-to-br from-indigo-900 via-indigo-950 to-[#0b1024] shadow-[0_30px_80px_rgba(30,27,75,0.16)]"
              >
                
                <Pattern className="absolute inset-0 text-white/[0.045]" />

                
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber-400/[0.07] blur-3xl" />

                
                <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.08] blur-2xl" />

                
                <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
                 
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                    }}
                    className="relative"
                  >
                   
                    <div className="absolute inset-0 scale-150 rounded-full bg-amber-300/10 blur-2xl" />

                    <FaMosque className="relative text-[92px] text-amber-300/95 drop-shadow-[0_0_25px_rgba(252,211,77,0.12)] sm:text-[110px]" />
                  </motion.div>

                  
                  <div className="mt-8 flex items-center gap-3">
                    <span className="h-px w-12 bg-amber-300/30" />
                    <span className="size-1.5 rotate-45 bg-amber-300" />
                    <span className="h-px w-12 bg-amber-300/30" />
                  </div>

                 
                  <h3 className="mt-7 font-display text-xl font-bold text-white sm:text-2xl">
                    মসজিদ পরিচালনা কমিটি
                  </h3>

                  <p className="mt-2 text-sm text-indigo-200">
                    পাইকপাড়া কাজীবাড়ী মসজিদ
                  </p>
                </div>

                
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
                <div className="absolute bottom-5 left-5 h-8 w-8 border-b border-l border-white/10" />
                <div className="absolute right-5 top-5 h-8 w-8 border-r border-t border-white/10" />
              </motion.div>
            </div>
          </Reveal>

          
          <Reveal from="right" className="lg:col-span-7">
            <div className="relative max-w-2xl">
              
              <div className="mb-7 flex items-center gap-4">
                <div className="relative flex size-12 items-center justify-center rounded-2xl bg-indigo-950 text-amber-300 shadow-lg shadow-indigo-950/10">
                  <FaQuoteLeft className="text-lg" />
                </div>

                <div className="h-px w-16 bg-gradient-to-r from-amber-400 to-transparent" />
              </div>

             
              <h2 className="font-display text-[1.75rem] font-bold leading-[1.6] tracking-tight text-indigo-950 sm:text-3xl sm:leading-[1.55] lg:text-[2.15rem]">
                আমরা চাই আমাদের মহল্লার প্রতিটি শিশু কুরআনের আলোয় বেড়ে উঠুক এবং প্রতিটি মুসল্লি একটি শান্ত, পরিচ্ছন্ন পরিবেশে ইবাদত করার সুযোগ পান।
              </h2>

              
              <div className="mt-8 flex items-center gap-2">
                <span className="h-1 w-10 rounded-full bg-indigo-900" />
                <span className="h-1 w-3 rounded-full bg-amber-400" />
              </div>
              <p className="mt-7 text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
                আপনাদের আন্তরিক সহযোগিতা ও দোয়া ছাড়া এই প্রতিষ্ঠান
                চালানো সম্ভব নয়। প্রতিটি দান, প্রতিটি পরামর্শ আমাদের
                কাছে মূল্যবান। আল্লাহ আমাদের সকলের প্রচেষ্টা কবুল করুন।
              </p>

              <div className="absolute -right-6 top-0 hidden select-none font-serif text-[180px] leading-none text-indigo-950/[0.025] lg:block">
                ”
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}