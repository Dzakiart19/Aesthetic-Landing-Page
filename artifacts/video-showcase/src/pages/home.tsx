import React, { useState, useCallback } from 'react';
import { HeroSection } from '@/components/sections/hero-section';
import { VisionSection } from '@/components/sections/vision-section';
import { GallerySection } from '@/components/sections/gallery-section';
import { CreditsSection } from '@/components/sections/credits-section';
import { useBackGuard } from '@/hooks/use-back-guard';

function ExitDialog({ open, onStay, onLeave }: { open: boolean; onStay: () => void; onLeave: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onStay} />

      {/* Dialog box */}
      <div className="relative z-10 w-[90vw] max-w-sm bg-[#0d0d0d] border-2 border-primary/60 shadow-[0_0_60px_rgba(220,38,38,0.3)] p-6 flex flex-col items-center gap-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Glow accent top */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />

        <div className="text-center space-y-2">
          <p className="text-primary font-bold uppercase tracking-[0.25em] text-xs font-sans">⚠ Perhatian</p>
          <h2 className="text-2xl font-display text-white leading-tight">
            Yakin ingin keluar?
          </h2>
          <p className="text-white/50 text-sm font-sans leading-relaxed">
            Masih banyak video seru yang belum kamu tonton. Tetap di sini?
          </p>
        </div>

        <div className="flex w-full gap-3 mt-2">
          <button
            onClick={onStay}
            className="flex-1 py-3 bg-primary text-white font-bold uppercase tracking-widest text-sm font-sans hover:bg-primary/80 transition-colors active:scale-95"
          >
            Tetap di Sini
          </button>
          <button
            onClick={onLeave}
            className="flex-1 py-3 bg-transparent border border-white/20 text-white/50 font-bold uppercase tracking-widest text-sm font-sans hover:border-white/40 hover:text-white/70 transition-colors active:scale-95"
          >
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [showExitDialog, setShowExitDialog] = useState(false);

  const handleBackAttempt = useCallback(() => {
    setShowExitDialog(true);
  }, []);

  const { confirmExit } = useBackGuard(handleBackAttempt);

  const handleStay = useCallback(() => {
    setShowExitDialog(false);
  }, []);

  const handleLeave = useCallback(() => {
    setShowExitDialog(false);
    confirmExit();
  }, [confirmExit]);

  return (
    <main className="min-h-screen w-full bg-background text-foreground relative selection:bg-primary selection:text-white">
      {/* Exit Intent Dialog */}
      <ExitDialog open={showExitDialog} onStay={handleStay} onLeave={handleLeave} />

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
