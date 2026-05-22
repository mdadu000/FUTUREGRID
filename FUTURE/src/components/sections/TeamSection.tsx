import { Section } from "../ui-fg/Section";
import { Reveal } from "../ui-fg/Reveal";
import { motion } from "framer-motion";

const TEAM_NAME = "9-ELEVEN";
const PROJECT_TITLE = "FUTURE GRID";

const COMMON_ROLE = "AI & ML ENGINEER";

const team = [
  { name: "Mohammed Aasim Ali" },
  { name: "Mohammed Adnan" },
  { name: "Mohammed Huzaif Mueez" },
];

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
}

export function TeamSection() {
  return (
    <Section
      id="team"
      eyebrow={`Team · ${TEAM_NAME}`}
      title={<>The minds behind <span className="text-cyan">{PROJECT_TITLE}.</span></>}
      titleClassName="text-white"
      subtitle={
        <>
          Built by <span className="text-cyan font-semibold tracking-wide">Team {TEAM_NAME}</span> — a focused collective
          of engineers and researchers architecting predictive society at scale.
        </>
      }
      subtitleClassName="text-white/90"
      className="relative overflow-hidden bg-black"
    >
      {/* Premium 3D Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Deep space gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080818] via-[#0c0c28] to-[#050510]" />

        {/* Rotating constellation ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/[0.03]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[0.04]"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/[0.05]"
        />

        {/* Floating 3D glow orbs */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[15%] w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, oklch(0.65 0.24 295 / 15%), transparent 70%)' }}
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[15%] left-[10%] w-[350px] h-[350px] rounded-full"
          style={{ background: 'radial-gradient(circle, oklch(0.84 0.16 200 / 10%), transparent 70%)' }}
        />
        <motion.div
          animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] left-[40%] w-[250px] h-[250px] rounded-full"
          style={{ background: 'radial-gradient(circle, oklch(0.72 0.18 250 / 10%), transparent 70%)' }}
        />

        {/* Subtle radial center spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
             style={{ background: 'radial-gradient(circle, oklch(0.72 0.18 250 / 6%), transparent 60%)' }} />
      </div>

      <div className="relative z-10">
      <Reveal>
        <div className="mb-12 flex items-center justify-center">
          <div className="relative inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/10 shadow-glow">
            <span className="text-xs uppercase tracking-[0.4em] text-white/70">Team</span>
            <span className="h-6 w-px bg-white/15" />
            <span className="font-display text-3xl md:text-4xl font-bold text-gradient-primary tracking-[0.25em]">
              {TEAM_NAME}
            </span>
          </div>
        </div>
      </Reveal>

      {/* Common designation badge */}
      <Reveal delay={0.1}>
        <div className="mb-10 flex justify-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan/10 border border-cyan/20 backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse-glow" />
            <span className="text-sm uppercase tracking-[0.3em] text-cyan font-semibold">{COMMON_ROLE}</span>
          </div>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {team.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.1}>
            <div className="group relative rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/10 p-8 hover:translate-y-[-6px] hover:border-cyan-500/40 hover:shadow-glow transition-all duration-500 text-center">
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="mx-auto relative w-20 h-20 rounded-2xl bg-gradient-primary shadow-glow flex items-center justify-center font-display font-bold text-xl shrink-0 mb-5">
                <div className="absolute inset-0.5 rounded-[14px] bg-background/40 backdrop-blur-md flex items-center justify-center">
                  <span className="text-gradient text-lg">{initials(m.name)}</span>
                </div>
              </div>
              <div className="font-display text-lg font-bold text-white tracking-tight">{m.name}</div>
              <div className="mt-2 text-sm text-cyan/80 font-medium uppercase tracking-wider">{COMMON_ROLE}</div>
            </div>
          </Reveal>
        ))}
      </div>
      </div>
    </Section>
  );
}
