import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Download, Wand2, Maximize2, Trash2, Image, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const blueprints = [
  {
    id: "1",
    title: "Neural Network Architecture",
    videoTitle: "Introduction to ML",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    title: "Data Flow Diagram",
    videoTitle: "Neural Networks Deep Dive",
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=600&fit=crop",
    createdAt: "Yesterday",
  },
  {
    id: "3",
    title: "Algorithm Flowchart",
    videoTitle: "Data Structures",
    imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop",
    createdAt: "3 days ago",
  },
  {
    id: "4",
    title: "System Architecture",
    videoTitle: "Advanced Python",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
    createdAt: "1 week ago",
  },
];

const notes = [
  {
    id: "1",
    title: "Machine Learning Fundamentals",
    excerpt: "Key concepts covered: supervised learning, unsupervised learning, reinforcement learning...",
    wordCount: 1250,
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    title: "Neural Network Notes",
    excerpt: "Understanding backpropagation and gradient descent in deep neural networks...",
    wordCount: 890,
    createdAt: "Yesterday",
  },
];

export default function Assets() {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">Generated Assets</h1>
          <p className="text-muted-foreground">
            AI-generated diagrams, notes, and learning materials
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="blueprints" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="blueprints" className="gap-2">
              <Image className="w-4 h-4" />
              Visual Blueprints
            </TabsTrigger>
            <TabsTrigger value="notes" className="gap-2">
              <FileText className="w-4 h-4" />
              AI Notes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="blueprints">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {blueprints.map((blueprint, index) => (
                <motion.div
                  key={blueprint.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="blueprint-card group"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={blueprint.imageUrl}
                      alt={blueprint.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" className="flex-1 h-8">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="secondary" className="h-8">
                          <Wand2 className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="secondary" className="h-8">
                          <Maximize2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 rounded text-xs">
                      4K
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-sm mb-1">{blueprint.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      From: {blueprint.videoTitle}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {blueprint.createdAt}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="notes">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {notes.map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card-hover p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium mb-2">{note.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {note.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{note.wordCount} words</span>
                        <span>{note.createdAt}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Empty state */}
        {blueprints.length === 0 && (
          <div className="text-center py-16">
            <Wand2 className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No assets yet</h3>
            <p className="text-muted-foreground">
              AI-generated assets will appear here as you analyze videos
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
