import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export function Counter({ to, duration = 2, suffix = "", prefix = "" }: { to: number; duration?: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, to, mv]);

  useEffect(() => {
    return spring.on("change", (v) => setVal(v));
  }, [spring]);

  return (
    <span ref={ref}>
      {prefix}
      {Math.round(val).toLocaleString()}
      {suffix}
    </span>
  );
}
