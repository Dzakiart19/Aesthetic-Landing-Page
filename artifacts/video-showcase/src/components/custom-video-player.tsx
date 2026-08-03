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
    }, 2500);
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
      className={cn("group relative w-full overflow-hidden bg-black ambient-glow", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={CINEMA_CONFIG.VIDEO_SRC}
        poster={CINEMA_CONFIG.POSTER_SRC}
        className="w-full h-full object-cover transition-opacity duration-700"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        playsInline
        muted={isMuted}
      />

      {/* Center massive play button before interaction */}
      {!hasStarted && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity duration-500">
          <button 
            className="h-24 w-24 rounded-full border border-white/20 bg-black/40 text-white flex items-center justify-center hover:bg-primary/90 hover:text-black hover:border-primary hover:scale-105 transition-all duration-500 ease-out"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
          >
            <Play className="h-10 w-10 ml-2" fill="currentColor" />
          </button>
        </div>
      )}

      {/* Gradient overlay for controls */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500",
          isHovered || !isPlaying ? "opacity-100" : "opacity-0"
        )} 
      />

      {/* Controls Bar */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-4 transition-all duration-500 transform",
          isHovered || !isPlaying ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        )}
        onClick={(e) => e.stopPropagation()} // Prevent clicking controls from pausing video
      >
        <div className="flex items-center gap-4 text-white/90">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="hover:text-primary transition-colors focus:outline-none"
          >
            {isPlaying ? <Pause className="h-6 w-6" fill="currentColor" /> : <Play className="h-6 w-6" fill="currentColor" />}
          </button>

          <span className="text-xs font-mono tracking-wider tabular-nums opacity-75">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <div className="flex-1 px-4 flex items-center group/slider cursor-pointer" onClick={(e) => e.stopPropagation()}>
             <Slider 
               value={[progress]} 
               max={100} 
               step={0.1}
               onValueChange={handleSeek}
             />
          </div>

          <button 
            onClick={toggleMute}
            className="hover:text-primary transition-colors focus:outline-none"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
          
          <button 
            onClick={toggleFullscreen}
            className="hover:text-primary transition-colors focus:outline-none ml-2"
          >
            <Maximize className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
