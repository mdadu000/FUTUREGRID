import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { SlideBackground } from "./SlideBackground";


/* ─── Slide variants ─────────────────────────────────────────────────────── */
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ─── Slide labels ───────────────────────────────────────────────────────── */
const SLIDE_LABELS = [
  "Problem", "Objectives", "Solution", "How It Works",
  "Classes", "Agent Intelligence", "Live Demo", "System Design",
  "Societal Impact", "Use Cases", "Team", "Finale",
];

/* ─── Main Component ─────────────────────────────────────────────────────── */
interface SlidePresentationProps {
  slides: React.ReactNode[];
}

export function SlidePresentation({ slides }: SlidePresentationProps) {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const total = slides.length;

  const go = useCallback(
    (next: number) => {
      if (next < 0 || next >= total) return;
      setDir(next > current ? 1 : -1);
      setCurrent(next);
    },
    [current, total]
  );

  const next = useCallback(() => go(current + 1), [go, current]);
  const prev = useCallback(() => go(current - 1), [go, current]);

  /* keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Don't navigate if user is typing in an input/textarea
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  /* click-to-advance (only on the slide backdrop, not on interactive els) */
  const handleSlideClick = (e: React.MouseEvent) => {
    const tag = (e.target as HTMLElement)?.tagName;
    const interactive = ["BUTTON", "A", "INPUT", "TEXTAREA", "SELECT", "LABEL"];
    if (interactive.includes(tag)) return;
    // also check if inside an interactive parent
    let el = e.target as HTMLElement | null;
    while (el) {
      if (interactive.includes(el.tagName)) return;
      el = el.parentElement;
    }
    next();
  };

  const pct = ((current + 1) / total) * 100;

  return (
    <div className="relative dark w-full h-screen bg-transparent text-foreground overflow-hidden select-none">

      {/* ── Per-slide 3D AI background ── */}
      <SlideBackground index={current} />

      {/* ── Top progress bar ── */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10 z-50">
        <motion.div
          className="h-full bg-gradient-primary"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* ── Home link (top-left) ── */}
      <div className="absolute top-4 left-5 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-base">←</span> Home
        </Link>
      </div>

      {/* ── Slide counter (top-right) ── */}
      <div className="absolute top-4 right-5 z-50 flex items-center gap-3">
        <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
          <span className="text-foreground font-semibold">{String(current + 1).padStart(2, "0")}</span>
          {" / "}{String(total).padStart(2, "0")}
        </span>
        <span className="text-xs tracking-wider text-cyan/70 hidden md:inline">
          {SLIDE_LABELS[current]}
        </span>
      </div>

      {/* ── Slides ── */}
      <div className="relative z-10 w-full h-full" onClick={handleSlideClick}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={current}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 overflow-y-auto overflow-x-hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {slides[current]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Dot navigation (bottom center) ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); go(i); }}
            className="group relative flex items-center justify-center"
            aria-label={`Go to slide ${i + 1}`}
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: i === current ? "24px" : "6px",
                height: "6px",
                background: i === current
                  ? "oklch(0.72 0.18 250)"
                  : "oklch(1 0 0 / 25%)",
                boxShadow: i === current ? "0 0 10px oklch(0.72 0.18 250 / 80%)" : "none",
              }}
            />
          </button>
        ))}
      </div>

      {/* ── Prev / Next arrow buttons ── */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        disabled={current === 0}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-xl glass-strong flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-20 transition-all hover:scale-110"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        disabled={current === total - 1}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-xl glass-strong flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-20 transition-all hover:scale-110"
        aria-label="Next slide"
      >
        ›
      </button>

      {/* ── Keyboard hint (bottom-right) ── */}
      <div className="absolute bottom-6 right-5 z-50 hidden md:flex items-center gap-2 text-[10px] tracking-widest uppercase text-muted-foreground/50">
        <span className="px-1.5 py-0.5 rounded border border-white/10 text-[9px]">←</span>
        <span className="px-1.5 py-0.5 rounded border border-white/10 text-[9px]">→</span>
        <span>navigate</span>
      </div>
    </div>
  );
}
