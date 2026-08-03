import React from 'react';
import { HeroSection } from '@/components/sections/hero-section';
import { VisionSection } from '@/components/sections/vision-section';
import { GallerySection } from '@/components/sections/gallery-section';
import { CreditsSection } from '@/components/sections/credits-section';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground relative selection:bg-primary selection:text-white">
      {/* Global Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Scrollable sections */}
      <div className="relative z-10 flex flex-col w-full">
        <HeroSection />
        <VisionSection />
        <GallerySection />
        <CreditsSection />
        
        {/* Footer */}
        <footer className="w-full py-16 text-center text-primary/40 text-sm font-sans font-bold uppercase tracking-[0.3em] bg-black border-t-8 border-primary relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-accent/50" />
          <p className="relative z-10 hover:text-primary transition-colors cursor-default">© {new Date().getFullYear()} INFERNO STUDIOS. IGNITING THE WEB.</p>
        </footer>
      </div>
    </main>
  );
}
