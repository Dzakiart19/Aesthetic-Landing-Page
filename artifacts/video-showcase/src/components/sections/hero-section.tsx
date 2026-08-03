import React from 'react';
import { CustomVideoPlayer } from '@/components/custom-video-player';
import { CINEMA_CONFIG } from '@/config';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative w-full flex flex-col items-center overflow-hidden bg-black">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vh] bg-primary/20 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vh] bg-accent/20 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen" />

      {/* Title — above video, with padding */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="z-10 w-full text-center px-4 pt-8 pb-4"
      >
        <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/30 rounded-none mb-3">
          <p className="uppercase tracking-[0.2em] text-xs md:text-sm text-primary font-bold animate-pulse">
            🔥 PORN VIDEOS
          </p>
        </div>
        <h1 className="text-5xl sm:text-7xl md:text-[10rem] leading-none font-display text-white text-glow-red">
          {CINEMA_CONFIG.TITLE}
        </h1>
      </motion.div>

      {/* Video — full width, no side padding, portrait ratio */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="z-10 w-full relative overflow-hidden bg-black group"
        style={{ aspectRatio: '9/16', maxHeight: '100dvh' }}
      >
        <div className="absolute inset-0 bg-primary/10 mix-blend-color-burn pointer-events-none z-10 group-hover:opacity-0 transition-opacity duration-500" />
        <CustomVideoPlayer />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="z-10 flex flex-col items-center justify-center text-primary py-6"
      >
        <span className="text-sm font-bold uppercase tracking-[0.3em] mb-4 font-sans text-primary animate-pulse">Scroll</span>
        <div className="w-1 h-16 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
