import React from 'react';
import { motion } from 'framer-motion';

const CREDITS = [
  { role: "Creative Director", name: "Jaxon Reed" },
  { role: "Visual Effects", name: "Kira V." },
  { role: "Audio Provocateur", name: "DJ Syntax" },
  { role: "Action Camera", name: "Leo Cruz" },
  { role: "Color & Grade", name: "Samira Frost" },
  { role: "Hype Assembly", name: "Max 'Glitch' Torres" }
];

export function CreditsSection() {
  return (
    <section className="relative w-full py-32 px-4 sm:px-8 bg-black border-t-4 border-primary/20 flex flex-col items-center justify-center">
      {/* Background intensity */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-black to-black pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-6xl relative z-10"
      >
        <div className="text-center mb-24 relative">
          <h2 className="text-6xl md:text-8xl font-display text-white uppercase tracking-tight">THE TEAM</h2>
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-32 h-1.5 bg-primary" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 text-center">
          {CREDITS.map((credit, i) => (
            <motion.div 
              key={credit.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
              className="flex flex-col space-y-1 group"
            >
              <span className="text-sm font-sans font-bold uppercase tracking-widest text-primary/80 group-hover:text-primary transition-colors">{credit.role}</span>
              <span className="text-3xl font-display text-white group-hover:text-glow-red transition-all duration-300">{credit.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
