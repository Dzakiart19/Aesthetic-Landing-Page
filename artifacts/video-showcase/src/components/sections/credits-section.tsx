import React from 'react';
import { motion } from 'framer-motion';

const CREDITS = [
  { role: "Director", name: "Elias Vance" },
  { role: "Cinematographer", name: "Sarah Lin" },
  { role: "Original Score", name: "Marcus Thorne" },
  { role: "Editor", name: "David Chen" },
  { role: "Colorist", name: "Elena Rostova" },
  { role: "Sound Design", name: "James Holden" }
];

export function CreditsSection() {
  return (
    <section className="relative w-full py-32 px-4 sm:px-8 bg-black flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full max-w-5xl"
      >
        <div className="text-center mb-20">
          <h2 className="text-2xl font-serif text-white/80 uppercase tracking-[0.2em]">The Artisans</h2>
          <div className="w-px h-16 bg-primary/30 mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 text-center">
          {CREDITS.map((credit, i) => (
            <motion.div 
              key={credit.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="flex flex-col space-y-2"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-primary/70">{credit.role}</span>
              <span className="text-xl font-serif text-white/90">{credit.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
