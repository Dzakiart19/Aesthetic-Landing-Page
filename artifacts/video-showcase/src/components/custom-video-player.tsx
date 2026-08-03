import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { CINEMA_CONFIG } from '@/config';

interface CustomVideoPlayerProps {
  className?: string;
}

export function CustomVideoPlayer({ className }: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        setHasStarted(true);
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100 || 0);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }, []);

  const handleSeek = useCallback((value: number[]) => {
    if (videoRef.current && value[0] !== undefined) {
      const newTime = (value[0] / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress(value[0]);
    }
  }, []);

  const toggleFullscreen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable full-screen mode:", err);
      });
    } else {
      document.exitFullscreen();
    }
  }, []);

  const handleMouseMove = useCallback(() => {
    setIsHovered(true);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setIsHovered(false);
    }, 2000);
  }, [isPlaying]);

  const handleMouseLeave = useCallback(() => {
    if (isPlaying) setIsHovered(false);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div 
      ref={containerRef}
      className={cn("group relative w-full h-full overflow-hidden bg-black", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={CINEMA_CONFIG.VIDEO_SRC}
        poster={CINEMA_CONFIG.POSTER_SRC}
        className="w-full h-full object-cover transition-all duration-300"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        playsInline
        muted={isMuted}
      />

      {/* Intense red flash before playing */}
      {!hasStarted && (
        <div className="absolute inset-0 bg-primary/20 mix-blend-color-burn pointer-events-none" />
      )}

      {/* Center aggressive play button before interaction */}
      {!hasStarted && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <button 
            className="h-32 w-32 rounded-none border-4 border-primary bg-primary/20 text-white flex items-center justify-center hover:bg-primary hover:text-black hover:scale-110 active:scale-95 transition-all duration-200 ease-out animate-fire-pulse shadow-[0_0_50px_rgba(255,26,26,0.5)]"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
          >
            <Play className="h-16 w-16 ml-3" fill="currentColor" />
          </button>
        </div>
      )}

      {/* Gradient overlay for controls */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-300",
          isHovered || !isPlaying ? "opacity-100" : "opacity-0"
        )} 
      />

      {/* Controls Bar */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col gap-4 transition-all duration-300 transform",
          isHovered || !isPlaying ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bar line */}
        <div className="w-full px-2" onClick={(e) => e.stopPropagation()}>
           <Slider 
             value={[progress]} 
             max={100} 
             step={0.1}
             onValueChange={handleSeek}
             className="cursor-pointer"
           />
        </div>

        <div className="flex items-center justify-between text-white font-sans mt-2">
          <div className="flex items-center gap-6">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="hover:text-primary transition-colors focus:outline-none"
            >
              {isPlaying ? <Pause className="h-8 w-8" fill="currentColor" /> : <Play className="h-8 w-8" fill="currentColor" />}
            </button>

            <span className="text-sm font-bold tracking-wider tabular-nums opacity-90 hidden sm:block">
              {formatTime(currentTime)} <span className="text-primary/50">/</span> {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={toggleMute}
              className="hover:text-primary transition-colors focus:outline-none"
            >
              {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
            </button>
            
            <button 
              onClick={toggleFullscreen}
              className="hover:text-primary transition-colors focus:outline-none"
            >
              <Maximize className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
