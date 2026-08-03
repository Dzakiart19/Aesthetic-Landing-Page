import React from 'react';
import { HeroSection } from '@/components/sections/hero-section';
import { VisionSection } from '@/components/sections/vision-section';
import { GallerySection } from '@/components/sections/gallery-section';
import { CreditsSection } from '@/components/sections/credits-section';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground relative selection:bg-primary selection:text-black">
      {/* Global Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Scrollable sections */}
      <div className="relative z-10 flex flex-col w-full">
        <HeroSection />
        <VisionSection />
        <GallerySection />
        <CreditsSection />
        
        {/* Footer */}
        <footer className="w-full py-12 text-center text-white/30 text-xs font-mono tracking-widest bg-black border-t border-white/5">
          <p>© {new Date().getFullYear()} ELIAS VANCE. ALL RIGHTS RESERVED.</p>
        </footer>
      </div>
    </main>
  );
}
