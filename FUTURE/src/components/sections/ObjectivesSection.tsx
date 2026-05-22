import { Section } from "../ui-fg/Section";
import { Reveal } from "../ui-fg/Reveal";
import { motion } from "framer-motion";

const OBJECTIVES = [
  { id: "01", title: "Predict Human Adoption", text: "Analyze acceptance vs. rejection before launch.", icon: "🎯" },
  { id: "02", title: "Household Logic", text: "Model salary, EMI, and family-based decisions.", icon: "🏠" },
  { id: "03", title: "Identify 'MAYBE' Users", text: "Detect high-value conversion opportunities.", icon: "💎" },
  { id: "04", title: "Class-Wise Patterns", text: "Strategy tailored to each economic class.", icon: "📊" },
  { id: "05", title: "Urban vs Rural", text: "Compare trust and velocity differences.", icon: "🌍" },
  { id: "06", title: "Strategic Actions", text: "Turn analytics into actionable expansion steps.", icon: "🚀" },
  { id: "07", title: "Zero Trial-and-Error", text: "Eliminate costly experiments and surveys.", icon: "⚡" },
];

export function ObjectivesSection() {
  return (
    <Section id="objectives" className="relative overflow-hidden bg-transparent">
      {/* Background Layer - Stunning 3D Digital City */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/objectives-final.png" 
          alt="Strategic Background" 
          className="w-full h-full object-cover opacity-40 scale-110"
          style={{ filter: 'brightness(0.6) saturate(0.9) contrast(1.1)' }}
        />
        {/* Advanced Gradient Masking for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.05)_0%,transparent_80%)] z-10" />
      </div>

      {/* Header Section - Enhanced Visibility */}
      <div className="relative z-20 mb-10">
        <Reveal>
          <div className="mb-4 text-cyan font-display font-black text-xs uppercase tracking-[0.5em] flex items-center gap-3">
            <span className="w-2 h-2 bg-cyan rounded-full animate-ping shadow-glow-cyan" /> 
            Mission Control
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-none tracking-tighter text-white mb-6 whitespace-nowrap">
            Strategizing <span className="text-gradient-primary">Societal Impact</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-light leading-relaxed">
            Building the predictive infrastructure for human-centric decision intelligence.
          </p>
        </Reveal>
      </div>

      {/* Unique Design: Strategic Blueprint Layout */}
      <div className="relative z-20 grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: The "Blueprint" Nodes */}
        <div className="lg:col-span-7 grid md:grid-cols-2 gap-4">
          {OBJECTIVES.map((obj, i) => (
            <Reveal key={obj.id} delay={i * 0.05} x={-20}>
              <div className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all duration-500 overflow-hidden">
                {/* Background ID number */}
                <div className="absolute -top-4 -right-2 text-7xl font-display font-black text-white/[0.02] group-hover:text-cyan-500/[0.05] transition-colors">
                  {obj.id}
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-lg border border-cyan-500/20 shadow-glow-cyan/20">
                      {obj.icon}
                    </span>
                    <h3 className="text-base font-display font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
                      {obj.title}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed group-hover:text-white/70 transition-colors">
                    {obj.text}
                  </p>
                </div>
                
                {/* Connector line effect */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent w-0 group-hover:w-full transition-all duration-700" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Right Side: The "Mission Core" */}
        <div className="lg:col-span-5 relative flex flex-col justify-start h-full">
          <Reveal delay={0.4}>
            <div className="relative p-10 rounded-[2.5rem] glass-strong border border-white/10 shadow-2xl overflow-hidden group">
              {/* Spinning geometric background */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1/2 -right-1/2 w-full h-full border border-cyan-500/5 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-1/2 -left-1/2 w-full h-full border border-purple-500/5 rounded-full"
              />

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-cyan-500/5 border border-cyan-500/10 text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em]">
                  Ultimate Mission
                </div>

                <h3 className="text-3xl md:text-4xl lg:text-4xl font-display font-black text-white leading-[1.05] mb-10 tracking-tight">
                  Test <span className="text-gradient-primary">Reality</span> <br />
                  Before You <br />
                  Spend <span className="text-purple-400">Capital</span>.
                </h3>

                <div className="space-y-6 text-left border-t border-white/5 pt-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-lg">📈</div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-0.5">Primary Outcome</div>
                      <p className="text-xs text-white/80 leading-relaxed">
                        Eliminate trial-and-error by predicting human behavior with high-fidelity mathematical certainty.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-lg">🔒</div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-0.5">Risk Status</div>
                      <p className="text-xs text-white/80 leading-relaxed">
                        Mitigate potential failures by testing regional, economic, and social variables in real-time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-50" />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
