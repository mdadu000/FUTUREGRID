import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../ui-fg/Section";
import { Reveal } from "../ui-fg/Reveal";
import { Counter } from "../ui-fg/Counter";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line,
  PieChart, Pie, Cell,
} from "recharts";

const SCENARIO_DEFAULT = "Fuel price increases by ₹10/liter";

type ScenarioData = {
  impacts: { label: string; value: number; dir: "up" | "down"; color: string }[];
  barData: { name: string; v: number }[];
  lineData: { m: string; spend: number; stress: number }[];
  pieData: { name: string; value: number; c: string }[];
};

const SCENARIOS: Record<string, ScenarioData> = {
  fuel: {
    impacts: [
      { label: "Poor Class Stress", value: 32, dir: "up", color: "oklch(0.65 0.22 25)" },
      { label: "Middle Class Spending", value: 18, dir: "down", color: "oklch(0.82 0.16 80)" },
      { label: "Migration Pressure", value: 9, dir: "up", color: "oklch(0.84 0.16 200)" },
      { label: "Elite Impact", value: 2, dir: "up", color: "oklch(0.72 0.18 155)" },
    ],
    barData: [
      { name: "C1", v: 92 }, { name: "C2", v: 84 }, { name: "C3", v: 71 },
      { name: "C4", v: 58 }, { name: "C5", v: 42 }, { name: "C6", v: 28 },
      { name: "C7", v: 14 }, { name: "C8", v: 6 }, { name: "C9", v: 2 },
    ],
    lineData: Array.from({ length: 12 }, (_, i) => ({ m: `D${i+1}`, spend: 100 - i * 1.6, stress: 40 + i * 3 })),
    pieData: [
      { name: "Affordability", value: 42, c: "oklch(0.72 0.18 250)" },
      { name: "Lost trust", value: 24, c: "oklch(0.65 0.24 295)" },
      { name: "Substitutes", value: 19, c: "oklch(0.84 0.16 200)" },
      { name: "Other", value: 15, c: "oklch(0.85 0.14 85)" },
    ],
  },
  tax: {
    impacts: [
      { label: "Consumer Spending", value: 24, dir: "down", color: "oklch(0.82 0.16 80)" },
      { label: "Business Closures", value: 11, dir: "up", color: "oklch(0.65 0.22 25)" },
      { label: "Savings Rate", value: 14, dir: "up", color: "oklch(0.72 0.18 155)" },
      { label: "Elite Tax Avoidance", value: 38, dir: "up", color: "oklch(0.84 0.16 200)" },
    ],
    barData: [
      { name: "C1", v: 88 }, { name: "C2", v: 72 }, { name: "C3", v: 60 },
      { name: "C4", v: 45 }, { name: "C5", v: 34 }, { name: "C6", v: 22 },
      { name: "C7", v: 10 }, { name: "C8", v: 5 }, { name: "C9", v: 1 },
    ],
    lineData: Array.from({ length: 12 }, (_, i) => ({ m: `D${i+1}`, spend: 95 - i * 2.1, stress: 35 + i * 2.5 })),
    pieData: [
      { name: "Tax Burden", value: 38, c: "oklch(0.65 0.22 25)" },
      { name: "Reduced Savings", value: 28, c: "oklch(0.72 0.18 250)" },
      { name: "Business Loss", value: 21, c: "oklch(0.65 0.24 295)" },
      { name: "Other", value: 13, c: "oklch(0.85 0.14 85)" },
    ],
  },
  drought: {
    impacts: [
      { label: "Food Scarcity", value: 47, dir: "up", color: "oklch(0.65 0.22 25)" },
      { label: "Rural Migration", value: 31, dir: "up", color: "oklch(0.82 0.16 80)" },
      { label: "Water Hoarding", value: 28, dir: "up", color: "oklch(0.84 0.16 200)" },
      { label: "Urban Stress", value: 19, dir: "up", color: "oklch(0.72 0.18 155)" },
    ],
    barData: [
      { name: "C1", v: 97 }, { name: "C2", v: 89 }, { name: "C3", v: 78 },
      { name: "C4", v: 62 }, { name: "C5", v: 44 }, { name: "C6", v: 30 },
      { name: "C7", v: 15 }, { name: "C8", v: 7 }, { name: "C9", v: 2 },
    ],
    lineData: Array.from({ length: 12 }, (_, i) => ({ m: `D${i+1}`, spend: 90 - i * 2.8, stress: 55 + i * 3.5 })),
    pieData: [
      { name: "Food Shortage", value: 45, c: "oklch(0.65 0.22 25)" },
      { name: "Migration", value: 27, c: "oklch(0.84 0.16 200)" },
      { name: "Health Issues", value: 18, c: "oklch(0.65 0.24 295)" },
      { name: "Other", value: 10, c: "oklch(0.85 0.14 85)" },
    ],
  },
  job: {
    impacts: [
      { label: "Unemployment Stress", value: 41, dir: "up", color: "oklch(0.65 0.22 25)" },
      { label: "Consumer Demand", value: 29, dir: "down", color: "oklch(0.82 0.16 80)" },
      { label: "Crime Rate", value: 16, dir: "up", color: "oklch(0.84 0.16 200)" },
      { label: "Skill Reskilling", value: 22, dir: "up", color: "oklch(0.72 0.18 155)" },
    ],
    barData: [
      { name: "C1", v: 85 }, { name: "C2", v: 76 }, { name: "C3", v: 65 },
      { name: "C4", v: 52 }, { name: "C5", v: 38 }, { name: "C6", v: 24 },
      { name: "C7", v: 12 }, { name: "C8", v: 5 }, { name: "C9", v: 1 },
    ],
    lineData: Array.from({ length: 12 }, (_, i) => ({ m: `D${i+1}`, spend: 88 - i * 2.4, stress: 50 + i * 2.8 })),
    pieData: [
      { name: "Income Loss", value: 40, c: "oklch(0.65 0.22 25)" },
      { name: "Mental Health", value: 25, c: "oklch(0.65 0.24 295)" },
      { name: "Debt Rise", value: 22, c: "oklch(0.72 0.18 250)" },
      { name: "Other", value: 13, c: "oklch(0.85 0.14 85)" },
    ],
  },
  pandemic: {
    impacts: [
      { label: "Mobility Reduction", value: 68, dir: "down", color: "oklch(0.65 0.22 25)" },
      { label: "Online Spending", value: 44, dir: "up", color: "oklch(0.72 0.18 155)" },
      { label: "Healthcare Stress", value: 55, dir: "up", color: "oklch(0.82 0.16 80)" },
      { label: "Mental Health Risk", value: 37, dir: "up", color: "oklch(0.84 0.16 200)" },
    ],
    barData: [
      { name: "C1", v: 96 }, { name: "C2", v: 88 }, { name: "C3", v: 75 },
      { name: "C4", v: 60 }, { name: "C5", v: 45 }, { name: "C6", v: 32 },
      { name: "C7", v: 18 }, { name: "C8", v: 9 }, { name: "C9", v: 3 },
    ],
    lineData: Array.from({ length: 12 }, (_, i) => ({ m: `D${i+1}`, spend: 80 - i * 1.2, stress: 60 + i * 2.2 })),
    pieData: [
      { name: "Healthcare", value: 38, c: "oklch(0.65 0.22 25)" },
      { name: "Job Loss", value: 30, c: "oklch(0.65 0.24 295)" },
      { name: "Supply Chain", value: 20, c: "oklch(0.72 0.18 250)" },
      { name: "Other", value: 12, c: "oklch(0.85 0.14 85)" },
    ],
  },
};

function detectScenario(text: string): ScenarioData {
  const t = text.toLowerCase();
  if (t.includes("fuel") || t.includes("petrol") || t.includes("diesel") || t.includes("price")) return SCENARIOS.fuel;
  if (t.includes("tax") || t.includes("gst") || t.includes("levy") || t.includes("income tax")) return SCENARIOS.tax;
  if (t.includes("drought") || t.includes("water") || t.includes("rain") || t.includes("crop")) return SCENARIOS.drought;
  if (t.includes("job") || t.includes("unemploy") || t.includes("layoff") || t.includes("retrench")) return SCENARIOS.job;
  if (t.includes("pandemic") || t.includes("covid") || t.includes("virus") || t.includes("lockdown")) return SCENARIOS.pandemic;
  return SCENARIOS.fuel; // default fallback
}

export function DemoSection() {
  const [scenario, setScenario] = useState(SCENARIO_DEFAULT);
  const [activeData, setActiveData] = useState<ScenarioData>(detectScenario(SCENARIO_DEFAULT));
  const [run, setRun] = useState(0);

  function handleSimulate() {
    setActiveData(detectScenario(scenario));
    setRun((r) => r + 1);
  }

  return (
    <Section
      id="demo"
      eyebrow="Live Simulation"
      title={<>Scenario <span className="text-gradient-primary">Simulation</span></>}
      subtitle="Type any real-world event. Watch 500 agents react across class, geography and emotion."
    >
      <Reveal>
        <div className="rounded-3xl glass-strong p-6 md:p-8 mb-8">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Scenario input</div>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex items-center gap-3 px-5 py-4 rounded-2xl bg-background/50 border border-white/10 focus-within:border-electric transition-colors">
              <span className="text-cyan font-mono">{`>`}</span>
              <input
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                className="flex-1 bg-transparent outline-none font-display text-lg md:text-xl"
              />
            </div>
            <button
              onClick={handleSimulate}
              className="px-7 py-4 rounded-2xl bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:shadow-glow-cyan transition-all hover:scale-[1.02]"
            >
              Simulate →
            </button>
          </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {activeData.impacts.map((it, i) => (
          <Reveal key={it.label} delay={i * 0.08}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${it.label}-${run}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl glass-strong p-5"
              >
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{it.label}</div>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="font-display text-3xl font-bold" style={{ color: it.color }}>
                    {it.dir === "up" ? "+" : "−"}
                    <Counter to={it.value} suffix="%" duration={1.4} />
                  </span>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(it.value * 2, 100)}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: it.color, boxShadow: `0 0 12px ${it.color}` }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Reveal className="lg:col-span-2">
          <div className="rounded-2xl glass-strong p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Stress by class</div>
                <div className="font-display text-lg font-semibold">Distribution across 9 economic tiers</div>
              </div>
            </div>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activeData.barData}>
                  <defs>
                    <linearGradient id="bg" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.72 0.18 250)" />
                      <stop offset="100%" stopColor="oklch(0.65 0.24 295)" />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="oklch(0.7 0.02 260)" fontSize={11} />
                  <YAxis stroke="oklch(0.7 0.02 260)" fontSize={11} />
                  <Tooltip cursor={{ fill: "rgba(255,255,255,0.04)" }} contentStyle={{ background: "rgba(20,20,40,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                  <Bar dataKey="v" fill="url(#bg)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl glass-strong p-6 h-full">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Rejection reasons</div>
            <div className="font-display text-lg font-semibold mb-2">Why agents pulled back</div>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={activeData.pieData} dataKey="value" innerRadius={55} outerRadius={90} paddingAngle={3} stroke="none">
                    {activeData.pieData.map((d) => <Cell key={d.name} fill={d.c} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "rgba(20,20,40,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {activeData.pieData.map(d => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: d.c }} />
                  <span className="text-muted-foreground">{d.name}</span>
                  <span className="ml-auto">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-3">
          <div className="rounded-2xl glass-strong p-6">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Behavior over 12 days</div>
            <div className="font-display text-lg font-semibold mb-2">Spending vs stress</div>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activeData.lineData}>
                  <XAxis dataKey="m" stroke="oklch(0.7 0.02 260)" fontSize={11} />
                  <YAxis stroke="oklch(0.7 0.02 260)" fontSize={11} />
                  <Tooltip contentStyle={{ background: "rgba(20,20,40,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                  <Line type="monotone" dataKey="spend" stroke="oklch(0.84 0.16 200)" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="stress" stroke="oklch(0.65 0.24 295)" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
