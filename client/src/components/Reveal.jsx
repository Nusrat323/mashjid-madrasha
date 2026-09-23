import { motion } from "framer-motion";

const offsets = {
  up: { y: 32 },
  left: { x: -48 },
  right: { x: 48 },
  zoom: { scale: 0.9 },
};

export default function Reveal({ children, from = "up", delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offsets[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
