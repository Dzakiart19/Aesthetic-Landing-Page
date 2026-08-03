import React from 'react';
import { CINEMA_CONFIG } from '@/config';
import { motion } from 'framer-motion';
import still1Url from "@assets/images/still1.jpg";

export function VisionSection() {
  return (
    <section className="relative w-full py-24 md:py-40 px-4 sm:px-8 md:px-16 bg-black border-t border-primary/20 overflow-hidden">
      {/* Diagonal red slash background element */}
      <div className="absolute top-0 right-0 w-[200%] h-[1px] bg-primary/30 origin-top-right -rotate-12 translate-y-32 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[200%] h-[1px] bg-accent/20 origin-top-right -rotate-12 translate-y-48 pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 space-y-10 relative z-10"
        >
          <h2 className="text-5xl md:text-7xl font-display leading-[0.9] text-white">
            Bokep Indo paling HOT 🥵<br/>
            <span className="text-primary text-glow-red">Bikin kamu basah duluan sebelum mulai 💦</span>
          </h2>
          <div className="w-24 h-2 bg-primary" />
          <p className="text-foreground/80 text-xl md:text-2xl font-sans font-medium leading-snug">
            🫦 {CINEMA_CONFIG.SUBTITLE}
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed font-sans max-w-lg">
            🤤 Koleksi video sange paling lengkap — ABG, Jilbab, Tante Girang, Viral TikTok. 
            Full HD, durasi panjang, langsung play tanpa iklan ganggu. 
            Dijamin nagih dan balik lagi tiap hari! 🔥
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex-1 w-full relative group"
        >
          <div className="absolute -inset-4 bg-primary/20 blur-2xl group-hover:bg-primary/40 transition-colors duration-500 z-0" />
          <div className="aspect-[4/5] relative overflow-hidden bg-black z-10 border-4 border-black group-hover:border-primary/50 transition-colors duration-500">
             <div className="w-full h-full relative overflow-hidden">
               <img 
                 src={still1Url} 
                 alt="Raw explosive content" 
                 className="w-full h-full object-contain grayscale contrast-[1.5] brightness-75 group-hover:grayscale-0 transition-all duration-700 ease-out"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent mix-blend-multiply opacity-80 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
             </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
