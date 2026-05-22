import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function Stars() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let raf = 0, w = 0, h = 0;
    type S = { x: number; y: number; r: number; a: number; v: number };
    let stars: S[] = [];
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: 220 }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.4 + 0.2,
        a: Math.random(),
        v: Math.random() * 0.02 + 0.005,
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.a += s.v;
        if (s.a > 1 || s.a < 0) s.v *= -1;
        s.y -= 0.04;
        if (s.y < 0) s.y = h;
        ctx.fillStyle = `rgba(200,220,255,${s.a * 0.9})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

export function CTASection() {
  return (
    <section id="cta" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 bg-gradient-hero" />
      <Stars />
      <div className="absolute inset-x-0 bottom-0 h-[40%] grid-bg opacity-30 [mask-image:linear-gradient(to_top,black,transparent)]" />
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-electric/20 blur-[160px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center max-w-5xl"
      >
        <div className="inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full glass text-xs uppercase tracking-[0.25em] text-cyan">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse-glow" />
          Now in private beta
        </div>
        <h2 className="font-display font-bold text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-tighter">
          <span className="text-gradient">Before you change</span>
          <br />
          <span className="text-gradient">the world,</span>
          <br />
          <span className="text-gradient-primary">simulate it first.</span>
        </h2>
        <p className="mt-7 text-lg text-muted-foreground max-w-xl mx-auto">
          Join the first organizations using FUTURE GRID to test reality before reality tests them.
        </p>
        <div className="mt-12 flex flex-col items-center gap-6">
          {/* Thank You card */}
          <div className="relative px-12 py-8 rounded-3xl glass-strong border border-white/10 text-center">
            <div className="absolute inset-0 rounded-3xl bg-gradient-primary opacity-5" />
            <div className="relative">
              <div className="text-[clamp(3rem,10vw,7rem)] font-display font-bold leading-none text-gradient tracking-tighter">
                Thank You
              </div>
              <div className="mt-4 flex items-center justify-center gap-3">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan/60" />
                <span className="text-sm uppercase tracking-[0.4em] text-cyan font-semibold">Team 9-ELEVEN</span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan/60" />
              </div>
              <p className="mt-4 text-muted-foreground text-sm tracking-wide">
                Mohammed Aasim Ali · Mohammed Adnan · Mohammed Huzaif Mueez
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-muted-foreground tracking-wider">
          © {new Date().getFullYear()} FUTURE GRID · Predictive Society Engine
        </div>
      </motion.div>
    </section>
  );
}
