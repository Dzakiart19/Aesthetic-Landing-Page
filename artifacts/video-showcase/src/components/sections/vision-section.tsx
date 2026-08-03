import React from 'react';
import { CINEMA_CONFIG } from '@/config';
import { motion } from 'framer-motion';
import still1Url from "@assets/generated_images/still1.jpg";

export function VisionSection() {
  return (
    <section className="relative w-full py-32 px-4 sm:px-8 md:px-16 bg-gradient-to-b from-background to-black border-t border-white/5">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="flex-1 space-y-8"
        >
          <h2 className="text-3xl md:text-5xl font-serif leading-tight">
            Light is not merely <span className="text-primary italic">illumination</span>.<br/>
            It is the narrative.
          </h2>
          <div className="w-12 h-[2px] bg-primary/50" />
          <p className="text-muted-foreground text-lg leading-relaxed font-light">
            {CINEMA_CONFIG.SUBTITLE} This piece represents months of rigorous 
            exploration into the emotional weight of absolute darkness, and the fragile
            hope found in warm, drifting amber. It is an invitation to pause, observe, 
            and feel the passage of time.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed font-light">
            Shot entirely in isolation, utilizing experimental analog optics and custom
            refractive glass elements to capture light in its purest, most volatile form.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="flex-1 w-full relative"
        >
          <div className="aspect-[4/5] relative overflow-hidden rounded-sm ring-1 ring-white/10 p-2 bg-white/5">
             <div className="w-full h-full relative overflow-hidden">
               <img 
                 src={still1Url} 
                 alt="Director's vision" 
                 className="w-full h-full object-cover grayscale-[30%] contrast-125 opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:grayscale-0 transition-all duration-1000"
               />
               <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent pointer-events-none" />
             </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
