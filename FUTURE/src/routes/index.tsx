import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ThreeBackground } from "@/components/ui-fg/ThreeBackground";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FUTURE GRID — by Team FEUGO" },
      { name: "description", content: "FUTURE GRID — a predictive AI society simulation engine. Built by Team FEUGO." },
      { property: "og:title", content: "FUTURE GRID — by Team FEUGO" },
      { property: "og:description", content: "Predictive AI Society Simulation. Built by Team FEUGO." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" },
    ],
  }),
  component: Landing,
});

const TEAM = [
  { name: "MOHAMMED AASIM ALI", role: "SYSTEM ARCHITECT" },
  { name: "MOHAMMED ADNAN", role: "DATA ENGINEER" },
  { name: "MOHAMMED NABEEL", role: "SIMULATION LEAD" },
  { name: "MOHAMMED HUZAIF MUEEZ", role: "AI SPECIALIST" },
];

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
}

function Landing() {
  const navigate = useNavigate();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Enter") navigate({ to: "/simulation" }); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);
  return (
    <main className="relative dark h-screen bg-transparent text-foreground overflow-hidden flex flex-col">
      <ThreeBackground />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-4 text-center">
        {/* Team chip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-3 mb-3 px-4 py-1.5 rounded-full glass text-xs uppercase tracking-[0.35em]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse-glow" />
          <span className="text-muted-foreground">Presented by Team</span>
          <span className="text-gradient-primary font-semibold">FEUGO</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-[clamp(2.2rem,8vw,6.5rem)] leading-[0.9] tracking-tighter"
        >
          <span className="text-gradient">FUTURE</span>
          <br />
          <span className="text-gradient-primary">GRID</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-3 text-base md:text-lg text-foreground/80 max-w-2xl leading-relaxed font-light"
        >
          A Predictive <span className="text-gradient-primary font-medium">AI Society</span> Simulation —
          test human behavior before testing the real world.
        </motion.p>

        {/* Launch CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6"
        >
          <Link
            to="/simulation"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold text-base shadow-glow hover:shadow-glow-cyan transition-all hover:scale-[1.03]"
          >
            <span className="absolute inset-0 rounded-2xl bg-gradient-primary blur-xl opacity-50 group-hover:opacity-80 transition-opacity -z-10" />
            Entering Into Future Grid
            <span className="transition-transform group-hover:translate-x-1.5 text-xl">→</span>
          </Link>
          <p className="mt-2 text-xs text-muted-foreground tracking-[0.25em] uppercase">
            Enter the full presentation
          </p>
        </motion.div>

        {/* Team members */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95 }}
          className="mt-6 w-full max-w-4xl"
        >
          <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-3">
            Team Members
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + i * 0.1 }}
                className="group glass-strong rounded-xl p-4 hover:translate-y-[-4px] transition-all duration-500 border border-white/5 relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="mx-auto mb-3 relative w-12 h-12 rounded-lg bg-gradient-primary shadow-glow flex items-center justify-center">
                  <div className="absolute inset-[1.5px] rounded-[6px] bg-background/90 backdrop-blur flex items-center justify-center">
                    <span className="font-display font-bold text-gradient text-sm tracking-wider">{initials(member.name)}</span>
                  </div>
                </div>
                <div className="font-display text-[10px] font-bold leading-tight uppercase tracking-widest text-foreground/90">{member.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="relative z-10 py-3 text-center text-[10px] tracking-[0.4em] uppercase text-muted-foreground"
      >
        © FEUGO · Future Grid
      </motion.footer>
    </main>
  );
}
