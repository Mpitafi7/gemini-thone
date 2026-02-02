import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { VideoDropzone } from "@/components/ui/VideoDropzone";
import { StatsCard } from "@/components/ui/StatsCard";
import { Clock, Brain, Zap, Upload, BookOpen, TrendingUp, Youtube, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { isValidYouTubeUrl, extractYouTubeVideoId } from "@/lib/youtube";

const stats = [
  { label: "Time Saved", value: "4.2h", change: "+23% this week", icon: Clock },
  { label: "Concepts Mastered", value: "47", change: "+8 today", icon: Brain },
  { label: "API Efficiency", value: "89%", change: "Token savings", icon: Zap },
];

const recentVideos = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    duration: "45:32",
    progress: 75,
  },
  {
    id: "2",
    title: "Neural Networks Explained",
    duration: "1:02:15",
    progress: 30,
  },
  {
    id: "3",
    title: "Data Structures Fundamentals",
    duration: "38:20",
    progress: 100,
  },
];

export default function Dashboard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isProcessingYoutube, setIsProcessingYoutube] = useState(false);
  const [youtubeError, setYoutubeError] = useState("");
  const navigate = useNavigate();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    // Navigate to tutor view after file selection
    setTimeout(() => {
      navigate("/tutor");
    }, 1000);
  };

  const handleYouTubeSubmit = async () => {
    setYoutubeError("");
    
    if (!youtubeUrl.trim()) {
      setYoutubeError("Please enter a YouTube URL");
      return;
    }

    if (!isValidYouTubeUrl(youtubeUrl)) {
      setYoutubeError("Invalid YouTube URL. Please check and try again.");
      return;
    }

    setIsProcessingYoutube(true);
    
    // Fast processing - immediately extract video ID and navigate
    const videoId = extractYouTubeVideoId(youtubeUrl);
    
    if (videoId) {
      // Store YouTube video info in sessionStorage for fast access
      sessionStorage.setItem("youtubeVideoId", videoId);
      sessionStorage.setItem("youtubeUrl", youtubeUrl);
      sessionStorage.setItem("videoType", "youtube");
      
      // Navigate immediately for fast processing
      setTimeout(() => {
        navigate("/tutor");
        setIsProcessingYoutube(false);
      }, 300);
    } else {
      setYoutubeError("Could not extract video ID from URL");
      setIsProcessingYoutube(false);
    }
  };

  const handleYouTubeKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleYouTubeSubmit();
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-muted-foreground">
            Upload a video or continue your learning journey.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Upload Section - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* YouTube URL Input */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Youtube className="w-5 h-5 text-primary" />
                <h2 className="font-semibold">Or Paste YouTube Link</h2>
              </div>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={youtubeUrl}
                    onChange={(e) => {
                      setYoutubeUrl(e.target.value);
                      setYoutubeError("");
                    }}
                    onKeyPress={handleYouTubeKeyPress}
                    className="flex-1 bg-muted/50 border-glass-border"
                    disabled={isProcessingYoutube}
                  />
                  <Button
                    onClick={handleYouTubeSubmit}
                    disabled={isProcessingYoutube || !youtubeUrl.trim()}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isProcessingYoutube ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Youtube className="w-4 h-4 mr-2" />
                        Process
                      </>
                    )}
                  </Button>
                </div>
                {youtubeError && (
                  <p className="text-sm text-destructive">{youtubeError}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Supports YouTube URLs • Fast processing • No download required
                </p>
              </div>
            </div>

            {/* File Upload Dropzone */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold">Upload Video File</h2>
                </div>
                <span className="text-xs text-muted-foreground">
                  Max 1 hour
                </span>
              </div>
              <VideoDropzone onFileSelect={handleFileSelect} />
            </div>
          </motion.div>

          {/* Stats Card - 1 column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatsCard stats={stats} />
          </motion.div>
        </div>

        {/* Recent Videos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="font-semibold">Recent Sessions</h2>
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              View all
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {recentVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="glass-card-hover p-4 cursor-pointer"
                onClick={() => navigate("/tutor")}
              >
                <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-muted-foreground/50" />
                </div>
                <h3 className="font-medium text-sm mb-1 truncate">
                  {video.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{video.duration}</span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {video.progress}%
                  </span>
                </div>
                {/* Progress bar */}
                <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${video.progress}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
