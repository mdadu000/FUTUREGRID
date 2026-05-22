import { Section } from "../ui-fg/Section";
import { Reveal } from "../ui-fg/Reveal";
import { motion } from "framer-motion";

const steps = [
  { n: "01", t: "User Enters Scenario", d: "Type any real-world event in plain language." },
  { n: "02", t: "NLP Event Parser", d: "AI decomposes the scenario into measurable signals." },
  { n: "03", t: "500 AI Agents Evaluate", d: "Every citizen reasons, feels, and decides individually." },
  { n: "04", t: "Decisions Collected", d: "Aggregated by class, region, and emotion." },
  { n: "05", t: "Analytics Generated", d: "Predicted impact rendered as live dashboards." },
];

export function HowItWorksSection() {
  return (
    <Section
      id="how"
      eyebrow="Pipeline"
      title={<>How <span className="text-gradient-primary">FUTURE GRID</span> Works</>}
      subtitle="From scenario to insight in under a minute. Five intelligent stages, fully autonomous."
    >
      <Reveal>
        <div className="rounded-3xl glass-strong p-8 md:p-12 mb-12 border border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-[10px] uppercase tracking-[0.4em] text-cyan font-black mb-4">Example Scenario</div>
          <div className="font-display text-3xl md:text-5xl font-bold italic leading-tight text-white">
            <span className="text-cyan">{`> `}</span>₹99/month <span className="text-gradient-primary">food delivery</span> subscription
          </div>
        </div>
      </Reveal>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-5">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12}>
              <div className="relative flex flex-col items-center">
                {/* Numbered circle/box */}
                <div className="relative z-10 mx-auto w-[84px] h-[84px] rounded-2xl glass-strong glow-border flex items-center justify-center font-display font-bold text-2xl text-gradient-primary mb-5 shadow-glow">
                  {s.n}
                </div>
                
                {/* Content */}
                <div className="text-center relative z-10">
                  <div className="font-semibold mb-1.5 text-white">{s.t}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">{s.d}</div>
                </div>

                {/* Horizontal arrow for desktop (md+) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-[42px] left-[50%] w-[calc(100%+1.25rem)] h-px items-center justify-center z-0 pointer-events-none">
                    <div className="w-full h-[2px] bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-cyan-500/40" />
                    <motion.div 
                      animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                      className="absolute left-[50%] -translate-x-1/2 bg-black border border-cyan-500/30 rounded-full p-1 shadow-glow-cyan/20"
                    >
                      <svg className="w-3 h-3 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                )}

                {/* Vertical arrow for mobile (<md) */}
                {i < steps.length - 1 && (
                  <div className="md:hidden flex flex-col items-center justify-center my-6 pointer-events-none">
                    <div className="w-[2px] h-8 bg-gradient-to-b from-cyan-500/40 to-purple-500/40" />
                    <motion.div 
                      animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                      className="bg-black border border-cyan-500/30 rounded-full p-1 my-1 shadow-glow-cyan/20"
                    >
                      <svg className="w-3 h-3 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
