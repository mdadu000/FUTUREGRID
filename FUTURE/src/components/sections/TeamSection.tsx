import { Section } from "../ui-fg/Section";
import { Reveal } from "../ui-fg/Reveal";
import { motion } from "framer-motion";

const TEAM_NAME = "FEUGO";
const PROJECT_TITLE = "FUTURE GRID";

const team = [
  { name: "Mohammed Aasim Ali", role: "Founder & Vision", area: "Product · Strategy · Architecture" },
  { name: "Mohammed Adnan", role: "AI & Simulation Engineer", area: "Gemini · LLM · Reasoning Core" },
  { name: "Mohammed Nabeel", role: "Full-Stack Engineer", area: "FastAPI · React · Realtime" },
  { name: "Mohammed Huzaif Mueez", role: "Research & Behavior Lead", area: "Economics · Agent Modeling" },
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
      title={<>The minds behind <span className="text-white">{PROJECT_TITLE}.</span></>}
      subtitle={
        <>
          Built by <span className="text-cyan font-semibold tracking-wide">Team {TEAM_NAME}</span> — a focused collective
          of engineers and researchers architecting predictive society at scale.
        </>
      }
      className="relative overflow-hidden bg-black"
    >
      {/* Premium Realistic Background - Collective Intelligence */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.3, opacity: 0 }}
          whileInView={{ scale: 1.1, opacity: 0.55 }}
          transition={{ duration: 3, ease: "easeOut" }}
          src="/agents-bg.png" 
          alt="Team Minds Background" 
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.55) saturate(0.9) contrast(1.1)' }}
        />
        {/* Localized Top-Left Dark Mask */}
        <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-gradient-to-br from-black via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80 z-10" />
      </div>

      <div className="relative z-10">
      <Reveal>
        <div className="mb-12 flex items-center justify-center">
          <div className="relative inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-glow">
            <span className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Team</span>
            <span className="h-6 w-px bg-white/15" />
            <span className="font-display text-3xl md:text-4xl font-bold text-gradient-primary tracking-[0.25em]">
              {TEAM_NAME}
            </span>
          </div>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5 max-w-5xl mx-auto">
        {team.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.08}>
            <div className="group relative rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 p-6 hover:translate-y-[-4px] transition-all duration-500">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-primary shadow-glow flex items-center justify-center font-display font-bold text-lg shrink-0">
                  <div className="absolute inset-0.5 rounded-[14px] bg-background/40 backdrop-blur-md flex items-center justify-center">
                    <span className="text-gradient">{initials(m.name)}</span>
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="font-display text-lg font-semibold truncate">{m.name}</div>
                  <div className="text-sm text-cyan">{m.role}</div>
                </div>
              </div>
              <div className="mt-5 pt-5 border-t border-white/10 text-xs uppercase tracking-widest text-muted-foreground">
                {m.area}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      </div>
    </Section>
  );
}
