
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaHandHoldingHeart,
} from "react-icons/fa";

import Pattern from "./Pattern.jsx";
import Reveal from "./Reveal.jsx";
import { navLinks } from "../data/site.js";
import { currentYear } from "../lib/format.js";
import { useSettings } from "../context/SettingsContext.jsx";

export default function Footer() {
  const { settings } = useSettings();

  const phone = settings?.phone || "";
  const email = settings?.email || "";

  return (
    <footer className="relative overflow-hidden bg-indigo-950 text-indigo-100">
      <Pattern className="text-white/5" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <Reveal>
          <h2 className="font-display text-lg font-bold leading-8 text-white">
            পাইকপাড়া কাজী আলফাজউদ্দীন জামে মসজিদ
          </h2>

          <p className="mt-3 text-sm leading-7 text-indigo-200">
            নামাজ, কুরআন শিক্ষা ও সমাজসেবার মাধ্যমে মহল্লার মানুষকে আল্লাহর
            পথে একত্র করাই আমাদের প্রচেষ্টা।
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="mb-4 font-display text-lg font-bold text-white">
            গুরুত্বপূর্ণ লিংক
          </h3>

          <ul className="space-y-2 text-sm">
            {navLinks.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-indigo-200 transition-colors duration-200 hover:text-amber-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.2}>
          <h3 className="mb-4 font-display text-lg font-bold text-white">
            যোগাযোগ
          </h3>

          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <FaMapMarkerAlt className="mt-1 shrink-0 text-amber-400" />

              <span className="leading-7 text-indigo-200">
                শরীয়তপুর, নড়িয়া, পাইকপাড়া
              </span>
            </li>

            <li className="flex gap-3">
              <FaPhoneAlt className="mt-1 shrink-0 text-amber-400" />

              <a
                href={
                  phone
                    ? `tel:${phone.replace(/\s+/g, "")}`
                    : "#"
                }
                className="text-indigo-200 transition-colors hover:text-amber-300"
              >
                {phone}
              </a>
            </li>

            <li className="flex gap-3">
              <FaEnvelope className="mt-1 shrink-0 text-amber-400" />

              <a
                href={email ? `mailto:${email}` : "#"}
                className="break-all text-indigo-200 transition-colors hover:text-amber-300"
              >
                {email}
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.3}>
          <h3 className="mb-4 font-display text-lg font-bold text-white">
            সদকায়ে জারিয়া
          </h3>

          <p className="text-sm leading-7 text-indigo-200">
            আপনার ছোট একটি দানও মসজিদ ও মাদ্রাসার কাজে বড় ভূমিকা রাখে।
          </p>

          <Link
            to="/donate"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 font-semibold text-indigo-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
          >
            <FaHandHoldingHeart />
            দান করুন
          </Link>
        </Reveal>
      </div>

      <div className="relative border-t border-white/10 py-5 text-center text-sm text-indigo-300">
        © {currentYear()} পাইকপাড়া কাজী আলফাজউদ্দীন জামে মসজিদ
      </div>
    </footer>
  );
}

