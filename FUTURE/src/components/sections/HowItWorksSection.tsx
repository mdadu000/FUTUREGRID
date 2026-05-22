import { Section } from "../ui-fg/Section";
import { Reveal } from "../ui-fg/Reveal";

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
        <div className="hidden md:block absolute top-[42px] left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-electric/60 to-transparent" />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12}>
              <div className="relative">
                <div className="relative z-10 mx-auto w-[84px] h-[84px] rounded-2xl glass-strong glow-border flex items-center justify-center font-display font-bold text-2xl text-gradient-primary mb-5 shadow-glow">
                  {s.n}
                </div>
                <div className="text-center">
                  <div className="font-semibold mb-1.5">{s.t}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">{s.d}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
