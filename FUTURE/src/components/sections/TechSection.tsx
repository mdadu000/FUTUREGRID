import { Section } from "../ui-fg/Section";
import { Reveal } from "../ui-fg/Reveal";

const stack = [
  {
    layer: "Frontend",
    color: "oklch(0.84 0.16 200)",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    layer: "Backend",
    color: "oklch(0.72 0.18 250)",
    items: ["FastAPI", "WebSocket", "Python Asyncio", "Redis Queue"],
  },
  {
    layer: "AI Layer",
    color: "oklch(0.65 0.24 295)",
    items: ["Gemini API (T1)", "Qwen Local LLM (T2)", "Rule Engine (T3)", "Embedding Store"],
  },
  {
    layer: "Data Layer",
    color: "oklch(0.85 0.14 85)",
    items: ["PostgreSQL", "SQLite (snapshot)", "Memory Engine", "Time-series store"],
  },
];

export function TechSection() {
  return (
    <Section
      id="tech"
      eyebrow="Architecture"
      title={<>Enterprise grade <span className="text-gradient-primary">system design.</span></>}
      subtitle="Built to scale from 500 to 5 million agents — with full observability, replay, and audit."
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
        {/* connecting lines */}
        <div className="hidden lg:block absolute top-1/2 left-[5%] right-[5%] h-px bg-gradient-to-r from-cyan/40 via-violet/40 to-gold/40" />
        {stack.map((s, i) => (
          <Reveal key={s.layer} delay={i * 0.1}>
            <div className="relative rounded-2xl glass-strong p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color, boxShadow: `0 0 14px ${s.color}` }} />
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Layer 0{i + 1}</span>
              </div>
              <h3 className="font-display text-2xl font-bold mb-4" style={{ color: s.color }}>{s.layer}</h3>
              <ul className="space-y-2">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-sm">
                    <span className="w-1 h-1 rounded-full bg-foreground/40" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.4}>
        <div className="mt-10 rounded-2xl glass-strong p-6 grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Latency</div>
            <div className="font-display text-2xl font-bold text-gradient-primary">~ 800ms</div>
            <div className="text-muted-foreground">end-to-end per scenario</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Concurrency</div>
            <div className="font-display text-2xl font-bold text-gradient-primary">500+</div>
            <div className="text-muted-foreground">parallel agent decisions</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Determinism</div>
            <div className="font-display text-2xl font-bold text-gradient-primary">100%</div>
            <div className="text-muted-foreground">replayable seeded runs</div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
