import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Counter } from "../ui-fg/Counter";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const stats = [
    { v: 500, label: "AI Agents", suf: "" },
    { v: 9, label: "Economic Classes", suf: "" },
    { v: 2, label: "Ecosystems", suf: "" },
    { v: 100, label: "Real-Time Decisions", suf: "%" },
  ];

  return (
    <section id="hero" ref={ref} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <motion.div style={{ y, opacity, scale }} className="relative z-10 px-6 text-center max-w-6xl mx-auto pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full glass text-xs uppercase tracking-[0.25em]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse-glow" />
          <span className="text-cyan/90">Predictive Society Engine · v1.0</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-[clamp(3rem,11vw,9rem)] leading-[0.95] tracking-tighter"
        >
          <span className="text-gradient">FUTURE</span>
          <br />
          <span className="text-gradient-primary">GRID</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-7 text-lg md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed font-light"
        >
          Test Human Behavior <span className="text-gradient-primary font-medium">Before</span> Testing In The Real World.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-4 text-sm md:text-base text-muted-foreground tracking-wider"
        >
          500 AI Agents · City + Village · 9 Economic Classes · 3-Tier AI Brain
        </motion.p>


        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: i * 0.4 }}
              className="glass-strong glow-border rounded-2xl p-4 md:p-5"
            >
              <div className="text-2xl md:text-4xl font-display font-bold text-gradient-primary">
                <Counter to={s.v} suffix={s.suf} />
              </div>
              <div className="mt-1 text-[11px] md:text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

    </section>
  );
}
