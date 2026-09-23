import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaTachometerAlt,
  FaDonate,
  FaUsers,
  FaBullhorn,
  FaCalendarAlt,
  FaEnvelopeOpenText,
  FaCog,
  FaBars,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext.jsx";

const links = [
  { to: "/admin", label: "ড্যাশবোর্ড", icon: FaTachometerAlt, end: true },
  { to: "/admin/donations", label: "দানসমূহ", icon: FaDonate },
  { to: "/admin/users", label: "ব্যবহারকারী", icon: FaUsers },
  { to: "/admin/notices", label: "নোটিশ", icon: FaBullhorn },
  { to: "/admin/events", label: "অনুষ্ঠান", icon: FaCalendarAlt },
  { to: "/admin/messages", label: "বার্তা", icon: FaEnvelopeOpenText },
  { to: "/admin/settings", label: "সেটিংস", icon: FaCog },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden" />}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                  isActive ? "bg-indigo-900 text-white shadow-md shadow-indigo-900/20" : "text-slate-600 hover:bg-indigo-50"
                }`
              }
            >
              <Icon /> {label}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-1 border-t border-slate-100 p-4">
          <p className="truncate px-4 pb-2 text-sm text-slate-500">{user.email}</p>
          <Link to="/" className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-slate-600 transition hover:bg-indigo-50">
            <FaHome /> সাইট দেখুন
          </Link>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-rose-600 transition hover:bg-rose-50"
          >
            <FaSignOutAlt /> লগআউট
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:hidden">
          <button
            onClick={() => setOpen(true)}
            aria-label="মেনু"
            className="grid size-10 place-items-center rounded-xl border border-slate-200 text-indigo-900"
          >
            <FaBars />
          </button>
          <span className="font-display font-bold text-indigo-950">অ্যাডমিন প্যানেল</span>
        </header>

        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 sm:p-8"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
}
