import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaHandHoldingHeart,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUserCircle,
} from "react-icons/fa";

import { navLinks } from "../data/site.js";
import { useAuth } from "../context/AuthContext.jsx";

const linkClass = ({ isActive }) =>
  `relative px-3 py-2 text-[15px] font-medium transition-colors ${
    isActive
      ? "text-indigo-900"
      : "text-slate-600 hover:text-indigo-900"
  }`;

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navbarRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      setMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
        setProfileOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const closeAll = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setProfileOpen(false);
  };

  const handleLogout = async () => {
    closeAll();
    await logout();
  };

  return (
    <header
      ref={navbarRef}
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? "border-slate-200 bg-white/85 shadow-sm backdrop-blur-lg"
          : "border-transparent bg-white"
      }`}
    >
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:h-20 lg:px-8 lg:py-0">
        <Link
          to="/"
          onClick={closeAll}
          className="min-w-0 flex-1"
        >
          <p className="truncate text-base font-bold leading-snug text-indigo-950 sm:text-lg lg:text-xl">
            পাইকপাড়া কাজী আলফাজউদ্দীন জামে মসজিদ
          </p>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={linkClass}
            >
              {({ isActive }) => (
                <>
                  {item.label}

                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-amber-500"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            to="/donate"
            onClick={closeAll}
            className="hidden items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 font-semibold text-indigo-950 shadow-lg shadow-amber-400/30 transition hover:-translate-y-0.5 hover:bg-amber-300 lg:inline-flex"
          >
            <FaHandHoldingHeart />
            দান করুন
          </Link>

          {user ? (
            <div
              ref={profileRef}
              className="relative hidden lg:block"
            >
              <button
                type="button"
                onClick={() =>
                  setProfileOpen((prev) => !prev)
                }
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 pr-3 transition hover:border-indigo-300"
              >
                {user.photo ? (
                  <img
                    src={user.photo}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="size-9 rounded-full object-cover"
                  />
                ) : (
                  <span className="grid size-9 place-items-center rounded-full bg-indigo-900 font-semibold text-white">
                    {(user.name || user.email)
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                )}

                <span className="max-w-24 truncate text-sm font-medium text-slate-700">
                  {user.name || "অ্যাকাউন্ট"}
                </span>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                      scale: 0.97,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                      scale: 0.97,
                    }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 z-50 mt-3 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
                  >
                    <div className="border-b border-slate-100 px-3 py-2">
                      <p className="truncate font-semibold text-indigo-950">
                        {user.name}
                      </p>

                      <p className="truncate text-xs text-slate-500">
                        {user.email}
                      </p>
                    </div>

                    {!isAdmin && (
                      <Link
                        to="/dashboard"
                        onClick={closeAll}
                        className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-700 transition hover:bg-indigo-50"
                      >
                        <FaUserCircle className="text-indigo-500" />
                        আমার দান ও প্রোফাইল
                      </Link>
                    )}

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={closeAll}
                        className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-700 transition hover:bg-indigo-50"
                      >
                        <FaTachometerAlt className="text-indigo-500" />
                        অ্যাডমিন প্যানেল
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-rose-600 transition hover:bg-rose-50"
                    >
                      <FaSignOutAlt />
                      লগআউট
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={closeAll}
              className="hidden rounded-xl border border-indigo-200 px-5 py-2.5 font-medium text-indigo-900 transition hover:bg-indigo-50 lg:inline-flex"
            >
              লগইন
            </Link>
          )}

          <button
            type="button"
            onClick={toggleMenu}
            aria-label={
              menuOpen
                ? "মেনু বন্ধ করুন"
                : "মেনু খুলুন"
            }
            aria-expanded={menuOpen}
            className="relative z-50 grid size-11 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-lg text-indigo-900 transition hover:border-indigo-300 hover:bg-indigo-50 lg:hidden"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.18,
              ease: "easeOut",
            }}
            className="border-t border-slate-100 bg-white shadow-lg lg:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
              {navLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={closeAll}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 font-medium transition ${
                      isActive
                        ? "bg-indigo-50 text-indigo-900"
                        : "text-slate-600 hover:bg-slate-50 hover:text-indigo-900"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <Link
                to="/donate"
                onClick={closeAll}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 font-semibold text-indigo-950 shadow-md shadow-amber-400/20 transition hover:bg-amber-300"
              >
                <FaHandHoldingHeart />
                দান করুন
              </Link>

              {!user && (
                <Link
                  to="/login"
                  onClick={closeAll}
                  className="flex items-center justify-center rounded-xl border border-indigo-200 px-4 py-3 font-semibold text-indigo-900 transition hover:bg-indigo-50"
                >
                  লগইন
                </Link>
              )}

              {user && (
                <div className="mt-2 border-t border-slate-100 pt-2">
                  {!isAdmin && (
                    <Link
                      to="/dashboard"
                      onClick={closeAll}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-slate-700 transition hover:bg-indigo-50"
                    >
                      <FaUserCircle className="text-indigo-500" />
                      আমার দান ও প্রোফাইল
                    </Link>
                  )}

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={closeAll}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-slate-700 transition hover:bg-indigo-50"
                    >
                      <FaTachometerAlt className="text-indigo-500" />
                      অ্যাডমিন প্যানেল
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium text-rose-600 transition hover:bg-rose-50"
                  >
                    <FaSignOutAlt />
                    লগআউট
                  </button>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}