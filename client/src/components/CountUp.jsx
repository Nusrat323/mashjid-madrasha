import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { formatNumber } from "../lib/format.js";

export default function CountUp({ value, format = formatNumber }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref}>{format(display)}</span>;
}
