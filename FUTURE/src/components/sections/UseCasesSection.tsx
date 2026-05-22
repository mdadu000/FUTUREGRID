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
      title={<>Built for <span className="text-white">decision makers.</span></>}
      subtitle="From boardrooms to policy halls — anywhere a decision touches human behavior."
      className="relative overflow-hidden bg-black"
    >
      {/* Premium Realistic Background - High Impact Visual */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.2, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="/solution-final.png" 
          alt="Applications Background" 
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.6) saturate(0.9) contrast(1.1)' }}
        />
        {/* Localized Top-Left Dark Mask */}
        <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-gradient-to-br from-black via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80 z-10" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {cases.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06}>
            <motion.div 
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative h-full rounded-[2.5rem] bg-white/[0.03] backdrop-blur-md p-8 overflow-hidden border border-white/10 hover:border-cyan-500/50 hover:shadow-glow transition-all duration-500"
            >
              {/* Animated 3D Glow Background */}
              <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-[80px] bg-${c.accent}-500`} />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-4xl mb-6 shadow-inner group-hover:shadow-glow transition-all">
                  {c.icon}
                </div>
                
                <h3 className="font-display text-2xl font-black mb-3 text-white tracking-tight">
                  {c.title}
                </h3>
                
                <p className="text-base text-muted-foreground leading-relaxed font-medium">
                  {c.desc}
                </p>
              </div>

              {/* Decorative 3D Corner Accent */}
              <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-br from-transparent to-white/5 rounded-tl-3xl opacity-50" />
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
