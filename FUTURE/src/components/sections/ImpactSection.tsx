import { Section } from "../ui-fg/Section";
import { Reveal } from "../ui-fg/Reveal";
import { Counter } from "../ui-fg/Counter";

const metrics = [
  { v: 80, suf: "%", l: "Reduction in research cost", d: "Compared to traditional surveys & focus groups" },
  { v: 1, suf: " min", l: "From scenario to insight", d: "Average end-to-end simulation time" },
  { v: 500, suf: "", l: "Human simulations instantly", d: "Across 9 classes and 2 ecosystems" },
  { v: 3, suf: "x", l: "Better launch decisions", d: "Validated against historical events" },
];

export function ImpactSection() {
  return (
    <Section
      id="impact"
      eyebrow="Why It Matters"
      title={<>From guesswork to <span className="text-gradient-primary">predictive intelligence.</span></>}
      subtitle="The companies that win the next decade will be the ones that simulate before they ship."
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m, i) => (
          <Reveal key={m.l} delay={i * 0.1}>
            <div className="relative rounded-2xl glass-strong glow-border p-7 h-full overflow-hidden">
              <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-electric/30 blur-3xl opacity-30" />
              <div className="relative">
                <div className="font-display text-5xl md:text-6xl font-bold text-gradient-primary leading-none">
                  <Counter to={m.v} suffix={m.suf} duration={2.2} />
                </div>
                <div className="mt-4 font-medium">{m.l}</div>
                <div className="mt-1.5 text-sm text-muted-foreground">{m.d}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
