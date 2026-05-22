import { Section } from "../ui-fg/Section";
import { Reveal } from "../ui-fg/Reveal";
import { motion } from "framer-motion";

const FAMILIES = [
  {
    title: "RED FAMILY",
    subtitle: "Poor Classes",
    color: "#991b1b",
    classes: [
      { id: "C1", name: "Extreme Poor", income: "< Rs.8,000/mo", desc: "Survival mode, zero savings, food insecure", range: 15 },
      { id: "C2", name: "Poor", income: "Rs.8,000–15,000", desc: "Basic nutrition met, zero health safety net", range: 35 },
      { id: "C3", name: "Lower Poor", income: "Rs.15,000–22,000", desc: "Shelter security, high micro-debt vulnerability", range: 55 },
    ]
  },
  {
    title: "YELLOW FAMILY",
    subtitle: "Middle Classes",
    color: "#d97706",
    classes: [
      { id: "C4", name: "Lower Middle", income: "Rs.22,000–40,000", desc: "EMI dependent, vulnerable to minor shocks", range: 45 },
      { id: "C5", name: "Middle Class", income: "Rs.40,000–75,000", desc: "Formal employment, insurance & education focus", range: 65 },
      { id: "C6", name: "Upper Middle", income: "Rs.75,000–1.5L", desc: "Active equity investments, robust savings rates", range: 85 },
    ]
  },
  {
    title: "GREEN FAMILY",
    subtitle: "Rich Classes",
    color: "#166534",
    classes: [
      { id: "C7", name: "Rich", income: "Rs.1.5L–3L", desc: "Premium lifestyles, diverse real estate portfolio", range: 40 },
      { id: "C8", name: "Very Rich", income: "Rs.3L–10L", desc: "Corporate leadership, direct private equity investments", range: 70 },
      { id: "C9", name: "Elite", income: "> Rs.10L/mo", desc: "Generational wealth, global capital exposure", range: 100 },
    ]
  }
];

export function ClassesSection() {
  return (
    <Section id="classes" className="relative overflow-hidden bg-transparent">
      {/* Premium Realistic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/economy-final-bg.png" 
          alt="Society Architecture Background" 
          className="w-full h-full object-cover opacity-30 scale-105"
          style={{ filter: 'brightness(0.2) saturate(0.5) contrast(1.2)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-transparent to-background/95 z-10" />
      </div>

      <div className="relative z-10">
        <Reveal>
          <div className="mb-4 text-cyan font-display font-black text-xs uppercase tracking-[0.6em]">
            Economic Class System
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black leading-tight text-white mb-12">
            9-Category <span className="text-gradient-primary">Socioeconomic</span> Architecture
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1400px]">
          {FAMILIES.map((family, i) => (
            <div key={family.title} className="space-y-6">
              {/* Family Header */}
              <Reveal delay={i * 0.1}>
                <div 
                  className="p-6 rounded-t-2xl border-b-4"
                  style={{ backgroundColor: family.color, borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  <h3 className="text-2xl font-display font-black text-white italic tracking-tighter">{family.title}</h3>
                  <p className="text-white/80 text-sm font-medium">{family.subtitle}</p>
                </div>
              </Reveal>

              {/* Class Cards */}
              <div className="space-y-4">
                {family.classes.map((cls, j) => (
                  <Reveal key={cls.id} delay={i * 0.1 + j * 0.05}>
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all group relative overflow-hidden">
                      <div className="flex items-center gap-5 mb-4">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center font-display font-black text-lg shadow-2xl"
                          style={{ backgroundColor: family.color }}
                        >
                          {cls.id}
                        </div>
                        <div>
                          <h4 className="text-xl font-display font-black text-white">{cls.name}</h4>
                          <p className="text-sm font-mono" style={{ color: family.color }}>{cls.income}</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-3">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${cls.range}%` }}
                          transition={{ duration: 1, delay: 0.5 + j * 0.1 }}
                          className="h-full"
                          style={{ backgroundColor: family.color }}
                        />
                      </div>
                      
                      <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
                        {cls.desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
