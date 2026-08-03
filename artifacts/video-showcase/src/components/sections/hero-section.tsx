import React from 'react';
import { CustomVideoPlayer } from '@/components/custom-video-player';
import { CINEMA_CONFIG } from '@/config';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center pt-24 pb-12 px-4 sm:px-8 md:px-16 overflow-hidden">
      {/* Abstract background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />
      
      <div className="w-full max-w-7xl z-10 flex flex-col gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-4"
        >
          <p className="uppercase tracking-[0.3em] text-xs md:text-sm text-primary/80 font-medium">
            Exclusive Premiere
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white tracking-wide">
            {CINEMA_CONFIG.TITLE}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full aspect-video rounded-sm overflow-hidden shadow-2xl relative ring-1 ring-white/10"
        >
          <CustomVideoPlayer />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col items-center justify-center text-white/50 animate-bounce mt-8"
        >
          <span className="text-xs uppercase tracking-widest mb-2 font-mono">Discover</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
