import { Section } from "../ui-fg/Section";
import { Reveal } from "../ui-fg/Reveal";
import { motion } from "framer-motion";

const cards = [
  { title: "Businesses", text: "Don't know if users will buy at Rs.99 vs Rs.149 before launching", icon: "🏢" },
  { title: "Governments", text: "Cannot predict public reaction to fuel price hikes or subsidy removal", icon: "🏛️" },
  { title: "Investors", text: "Cannot simulate middle-class panic behavior during stock market corrections", icon: "📈" },
  { title: "Startups", text: "Waste capital building products without validating demand in target segments", icon: "🚀" },
  { title: "Researchers", text: "Lack dynamic, real-time sociological simulation tools beyond static models", icon: "🔬" },
];

const questions = [
  "Will people actually adopt it?",
  "Which income groups will accept or reject it?",
  "Will EMI pressure reduce adoption?",
  "Will cities behave differently from villages?",
  "How much trust affects decisions?",
  "What happens after the first wave of adoption?"
];

export function ProblemSection() {
  return (
    <Section id="problem" className="relative flex flex-col justify-center min-h-screen">
      {/* Background layers removed to unify with 3D scene */}

      <Reveal>
        <div className="mb-3 text-red-500 font-mono text-sm tracking-[0.25em] uppercase flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse-glow shadow-[0_0_10px_rgba(239,68,68,0.8)]" /> 
          Problem Statement
        </div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-8 font-display">
          The Real-World Testing Problem
        </h2>
      </Reveal>

      {/* Main Red Banner - From Reference */}
      <Reveal delay={0.1}>
        <div className="relative overflow-hidden text-center">
          <p className="text-lg md:text-xl text-white/95 font-serif font-medium tracking-wide">
            Real-world testing of business decisions, government policies, and product launches is
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 md:gap-6 text-white font-bold tracking-[0.2em] text-sm md:text-lg uppercase">
            <span>Expensive</span> <span className="text-red-500">•</span>
            <span>Slow</span> <span className="text-red-500">•</span>
            <span>Irreversible</span> <span className="text-red-500">•</span>
            <span>High-Risk</span>
          </div>
        </div>
      </Reveal>

      {/* Main Feature Cards Grid - Upgraded to Premium 3D Glass Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((card, i) => (
          <Reveal key={card.title} delay={0.2 + i * 0.05}>
            <motion.div 
              whileHover={{ y: -8, scale: 1.03, borderColor: "rgba(239, 68, 68, 0.4)", boxShadow: "0 10px 30px -10px rgba(239, 68, 68, 0.25)" }}
              className="h-full border border-red-950/40 bg-white/[0.02] backdrop-blur-md rounded-2xl p-6 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-[2px] h-0 bg-red-500 group-hover:h-full transition-all duration-300" />
              {/* Outer glow background on hover */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl bg-red-500" />
              
              <div className="text-red-400 font-display font-semibold text-lg mb-3 flex items-center gap-2 relative z-10">
                <span className="text-xl opacity-80">{card.icon}</span> {card.title}
              </div>
              <p className="text-white/75 text-sm leading-relaxed relative z-10">
                {card.text}
              </p>
            </motion.div>
          </Reveal>
        ))}
      </div>

      {/* Bottom Layout: Questions & Thesis */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Unanswered Critical Questions (Upgraded) */}
        <Reveal delay={0.4} className="lg:col-span-7">
          <div className="relative h-full py-4">
            <div className="flex items-center gap-4 mb-8">
              <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 shadow-glow-red font-mono text-xl font-bold">?</span>
              <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight">
                Unanswered Critical Questions
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
              {questions.map((q, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="flex items-center gap-3 group/item cursor-default"
                >
                  <div className="flex-shrink-0 w-2 h-2 rounded-full border border-red-500/30 group-hover/item:bg-red-500 group-hover/item:border-red-500 transition-all duration-300" />
                  <span className="text-sm text-white/60 group-hover/item:text-white transition-colors duration-300">{q}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-10">
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.4em] text-red-500/80 font-bold mb-4">Risk Vectors</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Financial Losses", "Failed Launches", "Wasted Investment"].map((tag) => (
                      <span key={tag} className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/10 text-[10px] text-red-200/60 uppercase tracking-widest font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right: Thesis Thesis Statement */}
        <Reveal delay={0.6} className="lg:col-span-5 flex flex-col justify-start h-full lg:pl-12 pt-4 relative">
          <div className="relative">
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-red-500/5 border border-red-500/10 text-[10px] font-black text-red-500 uppercase tracking-[0.3em]">
              Primary Thesis
            </div>
            
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white leading-[1.1] mb-8 tracking-tight">
              How can we predict societal response <span className="text-gradient-primary">before</span> launching in the real world?
            </h3>
            
            <div className="space-y-6">
              <p className="text-base text-muted-foreground leading-relaxed">
                FutureGrid is the answer—an simulation platform built to predict real societal behavior and adoption patterns <span className="text-white font-medium">before capital is deployed</span>.
              </p>
              
              <div className="flex items-center gap-4 py-4">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-xl shadow-glow-red">
                  🎯
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/40 font-bold">Project Goal</div>
                  <div className="text-sm text-white font-medium">Eliminate trial-and-error decision making</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
