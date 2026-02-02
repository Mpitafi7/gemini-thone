import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { ThoughtWindow } from "@/components/ui/ThoughtWindow";
import { ChatInterface } from "@/components/ui/ChatInterface";
import { BlueprintGallery } from "@/components/ui/BlueprintGallery";
import { StatsCard } from "@/components/ui/StatsCard";
import { Clock, Brain, Zap } from "lucide-react";
import { analyzeYouTubeVideo, getChatResponse, generateDiagram } from "@/lib/gemini";

// Mock data
const mockMarkers = [
  { id: "1", time: 120, label: "Introduction to Concepts", type: "concept" as const },
  { id: "2", time: 340, label: "Practical Example 1", type: "example" as const },
  { id: "3", time: 580, label: "Key Summary Point", type: "summary" as const },
  { id: "4", time: 720, label: "Advanced Theory", type: "concept" as const },
  { id: "5", time: 890, label: "Demo Application", type: "example" as const },
];

const mockBlueprints = [
  {
    id: "1",
    title: "Neural Network Architecture",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    timestamp: "12:34",
  },
  {
    id: "2",
    title: "Data Flow Diagram",
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=600&fit=crop",
    timestamp: "24:15",
  },
];

const stats = [
  { label: "Time Saved", value: "23m", icon: Clock },
  { label: "Concepts", value: "12", icon: Brain },
  { label: "Efficiency", value: "94%", icon: Zap },
];

export default function TutorView() {
  const [thoughts, setThoughts] = useState<Array<{
    id: string;
    type: "thinking" | "analyzing" | "insight" | "conclusion";
    content: string;
    timestamp: string;
  }>>([]);
  const [messages, setMessages] = useState<Array<{
    id: string;
    role: "user" | "assistant";
    content: string;
  }>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Get YouTube video ID from sessionStorage (fast processing)
  const youtubeVideoId = sessionStorage.getItem("youtubeVideoId") || undefined;
  const videoType = sessionStorage.getItem("videoType");
  const [videoSummary, setVideoSummary] = useState<string>("");
  const [videoTranscript, setVideoTranscript] = useState<string>("");

  // Fast processing for YouTube videos with actual API calls
  useEffect(() => {
    if (!youtubeVideoId) return;
    
    setIsProcessing(true);
    
    // Add initial thought
    setThoughts([{
      id: `thought-init`,
      type: "thinking",
      content: "YouTube video detected. Initializing analysis...",
      timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
    }]);

    // Analyze video with Gemini API
    analyzeYouTubeVideo(youtubeVideoId).then((result) => {
      if (result.error) {
        setThoughts((prev) => [
          ...prev,
          {
            id: `thought-error`,
            type: "insight",
            content: `Error: ${result.error}`,
            timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
          },
        ]);
        setIsProcessing(false);
        return;
      }

      if (result.summary) {
        setVideoSummary(result.summary);
        setThoughts((prev) => [
          ...prev,
          {
            id: `thought-summary`,
            type: "analyzing",
            content: "Video analysis complete. Extracted key concepts...",
            timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
          },
          {
            id: `thought-concepts`,
            type: "insight",
            content: result.concepts 
              ? `Found ${result.concepts.length} key concepts`
              : "Video content analyzed successfully",
            timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
          },
          {
            id: `thought-ready`,
            type: "conclusion",
            content: "Ready for interactive tutoring!",
            timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
          },
        ]);
      }
      
      setIsProcessing(false);
    });
  }, [youtubeVideoId]);

  const handleSendMessage = async (message: string) => {
    const userMessage = {
      id: `msg-${Date.now()}`,
      role: "user" as const,
      content: message,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Add thought about processing the question
    setThoughts((prev) => [
      ...prev,
      {
        id: `thought-${Date.now()}`,
        type: "thinking",
        content: `Processing query: "${message.slice(0, 30)}..."`,
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
      },
    ]);

    // Check if user wants a diagram
    const wantsDiagram = message.toLowerCase().includes("diagram") || 
                         message.toLowerCase().includes("visual") ||
                         message.toLowerCase().includes("generate");

    try {
      if (wantsDiagram) {
        // Generate diagram
        setThoughts((prev) => [
          ...prev,
          {
            id: `thought-diagram`,
            type: "analyzing",
            content: "Generating visual diagram...",
            timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
          },
        ]);

        const diagramResult = await generateDiagram(message, videoSummary);
        
        if (diagramResult.error) {
          const errorMessage = {
            id: `msg-${Date.now()}`,
            role: "assistant" as const,
            content: `Sorry, I encountered an error: ${diagramResult.error}`,
          };
          setMessages((prev) => [...prev, errorMessage]);
        } else {
          const diagramMessage = {
            id: `msg-${Date.now()}`,
            role: "assistant" as const,
            content: diagramResult.description 
              ? `Here's a visual diagram description:\n\n${diagramResult.description}\n\nI can help you create this visualization. Would you like me to generate it?`
              : "I've prepared a diagram concept for you. The visual representation would show the key relationships and elements we discussed.",
          };
          setMessages((prev) => [...prev, diagramMessage]);
        }
      } else {
        // Get chat response
        setThoughts((prev) => [
          ...prev,
          {
            id: `thought-analyze`,
            type: "analyzing",
            content: "Retrieving relevant context from video...",
            timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
          },
        ]);

        const chatResult = await getChatResponse(message, {
          videoId: youtubeVideoId,
          videoType: videoType || undefined,
          transcript: videoTranscript,
          summary: videoSummary,
        });

        if (chatResult.error) {
          const errorMessage = {
            id: `msg-${Date.now()}`,
            role: "assistant" as const,
            content: `Sorry, I encountered an error: ${chatResult.error}. Please make sure your Gemini API key is set in Settings.`,
          };
          setMessages((prev) => [...prev, errorMessage]);
        } else {
          setThoughts((prev) => [
            ...prev,
            {
              id: `thought-insight`,
              type: "insight",
              content: "Found relevant information in video content",
              timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
            },
          ]);

          const aiMessage = {
            id: `msg-${Date.now()}`,
            role: "assistant" as const,
            content: chatResult.response || "I'm here to help! Ask me anything about the video.",
          };
          setMessages((prev) => [...prev, aiMessage]);
        }
      }
    } catch (error: any) {
      const errorMessage = {
        id: `msg-${Date.now()}`,
        role: "assistant" as const,
        content: `Sorry, something went wrong: ${error.message || "Unknown error"}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-2rem)] p-4 lg:p-6 flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Left Section - The Observer */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-2/5 flex flex-col gap-4"
        >
          <div className="flex-shrink-0">
            <h2 className="text-sm font-medium text-muted-foreground mb-2">
              The Observer
            </h2>
            <VideoPlayer 
              youtubeVideoId={youtubeVideoId}
              markers={mockMarkers} 
            />
          </div>
          <div className="hidden lg:block">
            <StatsCard stats={stats} />
          </div>
        </motion.div>

        {/* Center Section - The Thought Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:w-1/4 flex flex-col min-h-[300px] lg:min-h-0"
        >
          <h2 className="text-sm font-medium text-muted-foreground mb-2">
            The Thought Window
          </h2>
          <div className="flex-1">
            <ThoughtWindow thoughts={thoughts} isProcessing={isProcessing} />
          </div>
        </motion.div>

        {/* Right Section - The Mastery Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:w-1/3 flex flex-col gap-4"
        >
          <h2 className="text-sm font-medium text-muted-foreground">
            The Mastery Panel
          </h2>
          
          {/* Chat Interface */}
          <div className="flex-1 glass-card overflow-hidden min-h-[300px]">
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>

          {/* Blueprint Gallery */}
          <div className="flex-shrink-0">
            <BlueprintGallery blueprints={mockBlueprints} />
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
