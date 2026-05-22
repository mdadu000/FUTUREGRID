import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
}

export function Section({ id, children, className = "", eyebrow, title, subtitle }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 py-10 pt-16 perspective-section ${className}`}
    >
      {/* Scene floor removed to unify background */}
      {(eyebrow || title || subtitle) && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 max-w-4xl"
        >
          {eyebrow && (
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full glass text-xs uppercase tracking-[0.2em] text-cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse-glow" />
              {eyebrow}
            </div>
          )}
          {title && (
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-gradient">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}
      {children}
    </section>
  );
}
