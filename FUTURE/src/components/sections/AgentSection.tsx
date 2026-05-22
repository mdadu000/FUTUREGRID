import { motion } from "framer-motion";
import { Section } from "../ui-fg/Section";
import { Reveal } from "../ui-fg/Reveal";

const layers = [
  { name: "Identity", desc: "Income · Age · Profession · Family", color: "oklch(0.72 0.18 250)" },
  { name: "Emotion", desc: "Stress · Fear · Confidence · Hope", color: "oklch(0.65 0.24 295)" },
  { name: "Memory", desc: "Past decisions · Lived experiences", color: "oklch(0.84 0.16 200)" },
  { name: "Goals", desc: "Home · Loan freedom · Growth", color: "oklch(0.85 0.14 85)" },
];

const brain = [
  { tier: "Tier 1", name: "Gemini API", desc: "High-stakes reasoning · complex scenarios" },
  { tier: "Tier 2", name: "Local LLM (Qwen)", desc: "Fast contextual decisions · privacy-safe" },
  { tier: "Tier 3", name: "Rules Engine", desc: "Microseconds · deterministic reflexes" },
];

export function AgentSection() {
  return (
    <Section
      id="agents"
      eyebrow="Agent Intelligence"
      title={<>Every dot is a <span className="text-gradient-primary">human mind.</span></>}
      subtitle="Each AI citizen runs a layered cognitive architecture — identity, emotion, memory and goals — driven by a 3-tier intelligent brain."
      className="relative overflow-hidden"
    >
      {/* Premium Realistic Background - Agent Minds Population */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/agents-bg.png" 
          alt="Agent Minds Background" 
          className="w-full h-full object-cover opacity-30 scale-100"
          style={{ filter: 'brightness(0.4) saturate(0.8) contrast(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80 z-10" />
        <div className="absolute inset-0 bg-radial-vignette opacity-50 z-10" />
      </div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
        <Reveal>
          <div className="relative aspect-square max-w-[520px] mx-auto">
            {/* center core */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-32 h-32 rounded-full bg-gradient-primary shadow-glow flex items-center justify-center">
                <div className="absolute inset-2 rounded-full bg-background/60 backdrop-blur-xl" />
                <div className="relative font-display font-bold text-sm tracking-widest text-gradient">AGENT</div>
              </div>
            </div>
            {/* concentric rings */}
            {[1, 2, 3, 4].map((r) => (
              <motion.div
                key={r}
                animate={{ rotate: r % 2 ? 360 : -360 }}
                transition={{ duration: 30 + r * 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-white/[0.08]"
                style={{ margin: `${r * 28}px` }}
              />
            ))}
            {/* orbiting nodes */}
            {layers.map((l, i) => {
              const angle = (i / layers.length) * Math.PI * 2;
              const radius = 38;
              const cx = 50 + Math.cos(angle) * radius;
              const cy = 50 + Math.sin(angle) * radius;
              return (
                <motion.div
                  key={l.name}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, type: "spring" }}
                  className="absolute"
                  style={{ left: `${cx}%`, top: `${cy}%`, transform: "translate(-50%, -50%)" }}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                    className="px-4 py-3 rounded-xl glass-strong text-center min-w-[140px]"
                    style={{ borderColor: l.color }}
                  >
                    <div className="w-2 h-2 rounded-full mx-auto mb-1.5" style={{ background: l.color, boxShadow: `0 0 12px ${l.color}` }} />
                    <div className="font-medium text-sm">{l.name}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{l.desc}</div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </Reveal>

        <div className="space-y-4">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.25em] text-cyan mb-2">3-Tier Brain</div>
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-6">Decisions at every speed.</h3>
          </Reveal>
          {brain.map((b, i) => (
            <Reveal key={b.name} delay={i * 0.1}>
              <div className="group relative rounded-2xl glass-strong p-5 flex items-start gap-5 hover:translate-x-1 transition-transform">
                <div className="w-14 h-14 rounded-xl bg-gradient-primary shadow-glow flex items-center justify-center font-display font-bold text-sm shrink-0">
                  T{i + 1}
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{b.tier}</div>
                  <div className="font-display text-lg font-semibold">{b.name}</div>
                  <div className="text-sm text-muted-foreground mt-1">{b.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
