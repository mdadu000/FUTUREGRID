import { Section } from "../ui-fg/Section";
import { Reveal } from "../ui-fg/Reveal";
import { motion } from "framer-motion";

const AGENT_TRAITS = [
  { label: "Income Level", icon: "💰" },
  { label: "EMI Burden", icon: "💳" },
  { label: "Family Size", icon: "👨‍👩‍👧" },
  { label: "Profession", icon: "💼" },
  { label: "Trust Level", icon: "🤝" },
  { label: "Location", icon: "📍" },
  { label: "Class C1-C9", icon: "📊" },
];

const OUTPUT_METRICS = [
  "Adoption & Rejection Rates",
  "Conversion Opportunities",
  "Class-Wise Behavior Patterns",
  "Urban vs Rural Comparison",
  "Strategic Recommendations",
  "Future Growth Predictions"
];

export function SolutionSection() {
  return (
    <Section id="solution" className="relative overflow-hidden bg-transparent">
      {/* Premium Realistic Background - Digital Society & AI Intelligence */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/solution-ai-bg.png" 
          alt="Strategic Solution Background" 
          className="w-full h-full object-cover opacity-40 scale-100"
          style={{ filter: 'brightness(0.5) saturate(0.9) contrast(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80 z-10" />
        <div className="absolute inset-0 bg-radial-vignette opacity-60 z-10" />
      </div>

      <div className="relative z-10 grid lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: The Intelligence Blueprint */}
        <div className="lg:col-span-6 space-y-10">
          <Reveal>
            <div className="mb-4 text-purple-400 font-display font-black text-[10px] uppercase tracking-[0.5em] flex items-center gap-3">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-ping shadow-glow-purple" /> 
              Predictive Societal Intelligence
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight text-white">
              The <span className="text-gradient-primary">Solution</span> for <br />
              Total Certainty.
            </h2>
          </Reveal>

          <div className="flex flex-wrap gap-12">
            <Reveal delay={0.1}>
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-[0.4em] text-white/40 font-bold border-l-2 border-red-500/50 pl-3">Obsolete Methods</h4>
                <ul className="space-y-3">
                  {["Expensive Surveys", "Slow Market Research", "Manual Assumptions"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-red-400/60 line-through decoration-red-500/30">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-[0.4em] text-cyan font-bold border-l-2 border-cyan-500 pl-3">FutureGrid Core</h4>
                <ul className="space-y-3">
                  {["500 Synthetic Agents", "Neural Reasoning", "Instant Analytics"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white font-medium">
                      <span className="w-1.5 h-1.5 bg-cyan rounded-full shadow-glow-cyan" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Upgraded: The Synthetic Citizen Card */}
          <Reveal delay={0.3}>
            <div className="p-8 rounded-[2.5rem] glass-strong border border-white/10 relative overflow-hidden group bg-gradient-to-br from-white/[0.03] to-transparent">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-2xl animate-float">👤</div>
                    The Synthetic Citizen
                  </h3>
                  <div className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-bold text-green-500 uppercase tracking-widest animate-pulse">Live Reasoning</div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {AGENT_TRAITS.map((trait, i) => (
                    <div key={trait.label} className="space-y-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all group/trait">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-white/70 uppercase tracking-wider font-bold">
                          <span className="text-lg">{trait.icon}</span> {trait.label}
                        </div>
                        <div className="text-xs text-purple-400 font-mono">100%</div>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          transition={{ delay: 0.5 + i * 0.05, duration: 1 }}
                          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Background scanning line */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div 
                  animate={{ y: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-full h-1/2 bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent"
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Side: Process & Dashboard */}
        <div className="lg:col-span-6 lg:pl-6 space-y-8">
          
          {/* Live Scenario Box */}
          <Reveal delay={0.4}>
            <div className="p-10 rounded-[2rem] bg-black/40 border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[60px] rounded-full" />
              <div className="text-[10px] uppercase tracking-[0.4em] text-cyan font-black mb-4">Input Scenario</div>
              <div className="font-display text-3xl text-white font-bold italic leading-tight">
                "{`₹99/month food delivery subscription`}"
              </div>
              
              <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-8">
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ height: [6, 18, 9, 21, 6] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                      className="w-1.5 bg-cyan/40 rounded-full"
                    />
                  ))}
                </div>
                <div className="flex gap-8">
                  <div className="text-center">
                    <div className="text-[10px] uppercase text-white/30 font-bold mb-1">Accepted</div>
                    <div className="text-lg font-black text-green-400">62%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] uppercase text-white/30 font-bold mb-1">Rejected</div>
                    <div className="text-lg font-black text-red-400">24%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] uppercase text-white/30 font-bold mb-1">Hesitant</div>
                    <div className="text-lg font-black text-orange-400">14%</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Intelligence Dashboard */}
          <Reveal delay={0.5}>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-2xl shadow-glow-purple">📊</div>
                <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight">System Intelligence</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {OUTPUT_METRICS.map((metric, i) => (
                  <motion.div 
                    key={metric}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.05 }}
                    className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all group flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/60 group-hover:text-white transition-colors font-bold uppercase tracking-wide">{metric}</span>
                      <div className="w-2 h-2 rounded-full bg-cyan shadow-glow-cyan" />
                    </div>
                    {/* Tiny decorative graph bars */}
                    <div className="flex items-end gap-1.5 h-4 opacity-30 group-hover:opacity-100 transition-opacity">
                      {[...Array(10)].map((_, j) => (
                        <div 
                          key={j} 
                          className="w-1 bg-cyan/50 rounded-t-sm" 
                          style={{ height: `${Math.random() * 100}%` }} 
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-8 rounded-2xl border border-white/5 bg-white/[0.01] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-purple-500 to-cyan-500" />
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic">
                  "FutureGrid solves the problem of uncertainty. Smarter, safer, and more profitable decisions before the real-world launch."
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
