import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react";
import { Slider } from "./slider";
import { getYouTubeEmbedUrl } from "@/lib/youtube";

interface TimelineMarker {
  id: string;
  time: number;
  label: string;
  type: "concept" | "example" | "summary";
}

interface VideoPlayerProps {
  videoUrl?: string;
  youtubeVideoId?: string;
  markers?: TimelineMarker[];
  onMarkerClick?: (marker: TimelineMarker) => void;
}

const markerColors: Record<TimelineMarker["type"], string> = {
  concept: "bg-primary",
  example: "bg-accent",
  summary: "bg-success",
};

export function VideoPlayer({
  videoUrl,
  youtubeVideoId,
  markers = [],
  onMarkerClick,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isYouTube = !!youtubeVideoId;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // YouTube iframe API integration
  useEffect(() => {
    if (isYouTube && youtubeVideoId) {
      // Load YouTube IFrame API
      if (!(window as any).YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }
    }
  }, [isYouTube, youtubeVideoId]);

  const togglePlay = () => {
    if (isYouTube && iframeRef.current) {
      // YouTube iframe control
      const iframe = iframeRef.current;
      if (isPlaying) {
        iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      } else {
        iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
      setIsPlaying(!isPlaying);
    } else if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  return (
    <div className="glass-card overflow-hidden">
      {/* Video Area */}
      <div className="aspect-video bg-black relative group">
        {isYouTube && youtubeVideoId ? (
          <iframe
            ref={iframeRef}
            src={`${getYouTubeEmbedUrl(youtubeVideoId)}?enablejsapi=1&controls=1&modestbranding=1&rel=0`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => {
              // YouTube iframe loaded
              setIsPlaying(false);
            }}
          />
        ) : videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <Play className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">No video loaded</p>
            </div>
          </div>
        )}

        {/* Play overlay */}
        {(videoUrl || youtubeVideoId) && !isPlaying && (
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/20"
          >
            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
              <Play className="w-6 h-6 text-primary-foreground ml-1" />
            </div>
          </motion.button>
        )}
      </div>

      {/* Timeline with markers */}
      <div className="px-4 py-2 border-t border-glass-border">
        <div className="relative">
          <Slider
            value={[currentTime]}
            max={duration}
            step={0.1}
            onValueChange={handleSeek}
            className="w-full"
          />
          {/* Markers */}
          {markers.map((marker) => (
            <motion.button
              key={marker.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.3 }}
              onClick={() => onMarkerClick?.(marker)}
              className={`timeline-marker absolute top-1/2 -translate-y-1/2 ${markerColors[marker.type]}`}
              style={{ left: `${(marker.time / duration) * 100}%` }}
              title={marker.label}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-glass-border">
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => {
              if (isYouTube && iframeRef.current) {
                iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"seekTo","args":[0,true]}', '*');
              } else if (videoRef.current) {
                videoRef.current.currentTime -= 10;
              }
            }}
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={togglePlay}
            className="p-2 rounded-lg bg-primary hover:bg-primary/90 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-primary-foreground" />
            ) : (
              <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
            )}
          </button>
          <button
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => {
              if (isYouTube && iframeRef.current) {
                // YouTube skip forward (approximate)
                iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"seekTo","args":[0,true]}', '*');
              } else if (videoRef.current) {
                videoRef.current.currentTime += 10;
              }
            }}
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground font-mono">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              onValueChange={(v) => setVolume(v[0])}
              className="w-20"
            />
          </div>

          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
