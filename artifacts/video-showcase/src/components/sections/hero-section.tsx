import React from 'react';
import { CustomVideoPlayer } from '@/components/custom-video-player';
import { CINEMA_CONFIG } from '@/config';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center pt-24 pb-12 px-4 sm:px-8 md:px-16 overflow-hidden bg-black">
      {/* Intense explosive background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vh] bg-primary/20 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vh] bg-accent/20 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen" />
      
      <div className="w-full max-w-[1400px] z-10 flex flex-col gap-8 md:gap-16">
        <motion.div 
          initial={{ opacity: 0, scale: 1.1, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-2 mt-8 md:mt-0"
        >
          <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/30 rounded-none mb-6">
            <p className="uppercase tracking-[0.2em] text-xs md:text-sm text-primary font-bold animate-pulse">
              🔥 HOT DROP
            </p>
          </div>
          <h1 className="text-7xl sm:text-8xl md:text-[12rem] leading-none font-display text-white text-glow-red">
            {CINEMA_CONFIG.TITLE}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="w-full aspect-video overflow-hidden shadow-2xl relative border-2 border-primary/20 hover:border-primary/50 transition-colors duration-500 bg-black group"
        >
          <div className="absolute inset-0 bg-primary/10 mix-blend-color-burn pointer-events-none z-10 group-hover:opacity-0 transition-opacity duration-500" />
          <CustomVideoPlayer />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col items-center justify-center text-primary mt-4"
        >
          <span className="text-sm font-bold uppercase tracking-[0.3em] mb-4 font-sans text-primary animate-pulse">Scroll</span>
          <div className="w-1 h-16 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
