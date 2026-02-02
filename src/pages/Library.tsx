import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Search, Filter, Grid, List, BookOpen, Clock, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const videos = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    duration: "45:32",
    concepts: 8,
    lastWatched: "2 hours ago",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop",
  },
  {
    id: "2",
    title: "Neural Networks Deep Dive",
    duration: "1:02:15",
    concepts: 12,
    lastWatched: "Yesterday",
    thumbnail: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=225&fit=crop",
  },
  {
    id: "3",
    title: "Data Structures Fundamentals",
    duration: "38:20",
    concepts: 6,
    lastWatched: "3 days ago",
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop",
  },
  {
    id: "4",
    title: "Advanced Python Concepts",
    duration: "52:45",
    concepts: 10,
    lastWatched: "1 week ago",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=225&fit=crop",
  },
];

export default function Library() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Library</h1>
            <p className="text-muted-foreground">
              Your collection of analyzed videos
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search videos..."
                className="pl-10 w-64 bg-muted/50 border-glass-border"
              />
            </div>
            <Button variant="outline" size="icon" className="border-glass-border">
              <Filter className="w-4 h-4" />
            </Button>
            <div className="flex border border-glass-border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Video Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={
            viewMode === "grid"
              ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : "space-y-3"
          }
        >
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              onClick={() => navigate("/tutor")}
              className={
                viewMode === "grid"
                  ? "glass-card-hover overflow-hidden cursor-pointer"
                  : "glass-card-hover p-4 flex gap-4 cursor-pointer"
              }
            >
              {viewMode === "grid" ? (
                <>
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-xs font-mono">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-2 line-clamp-2">{video.title}</h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Brain className="w-3 h-3" />
                        {video.concepts} concepts
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {video.lastWatched}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-40 aspect-video rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-medium mb-1">{video.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{video.duration}</span>
                      <span className="flex items-center gap-1">
                        <Brain className="w-3 h-3" />
                        {video.concepts} concepts
                      </span>
                      <span>{video.lastWatched}</span>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Empty state for when no videos */}
        {videos.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No videos yet</h3>
            <p className="text-muted-foreground mb-4">
              Upload your first video to get started
            </p>
            <Button className="bg-primary hover:bg-primary/90">
              Upload Video
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
