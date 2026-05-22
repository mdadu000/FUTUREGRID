import { Section } from "../ui-fg/Section";
import { Reveal } from "../ui-fg/Reveal";
import { motion } from "framer-motion";

const cases = [
  { icon: "🏢", title: "Businesses", desc: "Pricing validation & product launches before going to market.", accent: "cyan" },
  { icon: "🏛️", title: "Governments", desc: "Predict tax impact, subsidy reach, and policy reception.", accent: "purple" },
  { icon: "📈", title: "Investors", desc: "Forecast consumer adoption and behavioral signals.", accent: "green" },
  { icon: "🚀", title: "Startups", desc: "Validate demand and messaging before burning capital.", accent: "yellow" },
  { icon: "🔬", title: "Researchers", desc: "Run behavioral economics experiments at societal scale.", accent: "blue" },
  { icon: "🏥", title: "NGOs & Health", desc: "Model public reaction to interventions and aid programs.", accent: "red" },
];

export function UseCasesSection() {
  return (
    <Section
      id="usecases"
      eyebrow="Applications"
      title={<>Built for <span className="text-cyan">decision makers.</span></>}
      titleClassName="text-white"
      subtitle="From boardrooms to policy halls — anywhere a decision touches human behavior."
      subtitleClassName="text-white/90"
      className="relative overflow-hidden bg-black"
    >
      {/* Premium 3D Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#0d0d2b] to-[#0a0a1a]" />
        
        {/* Animated grid floor */}
        <div className="absolute inset-0 opacity-15" style={{ perspective: '800px' }}>
          <div className="absolute inset-0 grid-bg animate-grid-move" style={{ transform: 'rotateX(45deg)', transformOrigin: 'center top' }} />
        </div>
        
        {/* Floating 3D orbs */}
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] right-[10%] w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, oklch(0.72 0.18 250 / 15%), transparent 70%)' }}
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] rounded-full"
          style={{ background: 'radial-gradient(circle, oklch(0.84 0.16 200 / 12%), transparent 70%)' }}
        />
        <motion.div
          animate={{ x: [0, 25, 0], y: [0, 25, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[50%] left-[50%] w-[500px] h-[500px] rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{ background: 'radial-gradient(circle, oklch(0.65 0.24 295 / 8%), transparent 70%)' }}
        />

        {/* Subtle horizontal light streaks */}
        <div className="absolute top-[30%] left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
        <div className="absolute top-[70%] left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/8 to-transparent" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {cases.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06}>
            <motion.div 
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative h-full rounded-[2.5rem] bg-white/[0.06] backdrop-blur-xl p-8 overflow-hidden border border-white/10 hover:border-cyan-500/40 hover:shadow-glow transition-all duration-500"
            >
              {/* Hover glow */}
              <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-[80px] bg-${c.accent}-500`} />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-4xl mb-6 group-hover:shadow-glow transition-all">
                  {c.icon}
                </div>
                
                <h3 className="font-display text-2xl font-black mb-3 text-white tracking-tight">
                  {c.title}
                </h3>
                
                <p className="text-base text-white/80 leading-relaxed font-medium">
                  {c.desc}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-br from-transparent to-white/5 rounded-tl-3xl opacity-50" />
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
