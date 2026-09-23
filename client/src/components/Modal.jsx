import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

export default function Modal({ open, title, onClose, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-900/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-indigo-950">{title}</h3>
              <button
                onClick={onClose}
                aria-label="বন্ধ করুন"
                className="grid size-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100"
              >
                <FaTimes />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
