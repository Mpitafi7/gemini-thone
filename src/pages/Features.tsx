import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import {
  Clock,
  Image,
  Brain,
  Zap,
  Eye,
  MessageSquare,
  Video,
  BookOpen,
  Target,
  TrendingUp,
  Layers,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Temporal Video Analysis",
    description:
      "AI extracts key moments, concepts, and insights from hour-long videos with precise timestamps.",
    details:
      "Our advanced AI analyzes video content frame-by-frame, identifying crucial learning moments, concept transitions, and key demonstrations. Every important moment is tagged with precise timestamps, making it easy to jump to specific sections.",
    benefits: [
      "Precise timestamp markers for every concept",
      "Automatic detection of key learning moments",
      "Support for videos up to 60+ minutes",
      "Real-time analysis and processing",
    ],
  },
  {
    icon: Image,
    title: "4K Visual Blueprints",
    description:
      "Generate high-resolution diagrams and visual summaries that crystallize complex concepts.",
    details:
      "Transform complex ideas into beautiful, high-resolution visual diagrams. Our AI generates detailed blueprints that help you visualize relationships, processes, and concepts in stunning 4K quality.",
    benefits: [
      "4K resolution visual diagrams",
      "Automatic concept visualization",
      "Exportable in multiple formats",
      "Interactive diagram exploration",
    ],
  },
  {
    icon: Brain,
    title: "High-Reasoning Tutoring",
    description:
      "See the AI's internal deliberation process as it reasons through problems step-by-step.",
    details:
      "Experience tutoring powered by advanced reasoning models. Watch as the AI breaks down complex problems, shows its thinking process, and guides you through solutions with transparent reasoning.",
    benefits: [
      "Step-by-step problem solving",
      "Transparent reasoning chains",
      "Adaptive learning paths",
      "Personalized explanations",
    ],
  },
  {
    icon: Eye,
    title: "The Thought Window",
    description:
      "Watch the model think in real-time with transparent reasoning chains and thought signatures.",
    details:
      "Get unprecedented insight into how AI processes information. The Thought Window shows real-time reasoning, analysis steps, and decision-making processes, making AI thinking transparent and understandable.",
    benefits: [
      "Real-time reasoning visualization",
      "Transparent AI decision-making",
      "Interactive thought exploration",
      "Learning from AI reasoning patterns",
    ],
  },
  {
    icon: MessageSquare,
    title: "Interactive Q&A",
    description:
      "Ask follow-up questions and get personalized explanations tied to specific video moments.",
    details:
      "Engage in natural conversations with your AI tutor. Ask questions, request clarifications, and get detailed explanations that are directly linked to specific moments in your video content.",
    benefits: [
      "Natural language conversations",
      "Context-aware responses",
      "Video timestamp integration",
      "Follow-up question support",
    ],
  },
  {
    icon: Zap,
    title: "Agentic Learning",
    description:
      "Track your progress with intelligent metrics: time saved, concepts mastered, and efficiency gains.",
    details:
      "Our intelligent system tracks your learning journey, measuring efficiency, time saved, and concepts mastered. Get insights into your learning patterns and optimize your study sessions.",
    benefits: [
      "Real-time progress tracking",
      "Efficiency metrics and analytics",
      "Personalized learning insights",
      "Time-saving calculations",
    ],
  },
];

const additionalFeatures = [
  {
    icon: Video,
    title: "Multi-Format Support",
    description: "Works with various video formats and platforms",
  },
  {
    icon: BookOpen,
    title: "Learning Library",
    description: "Organize and manage all your educational content",
  },
  {
    icon: Target,
    title: "Precision Learning",
    description: "Focus on exactly what you need to learn",
  },
  {
    icon: TrendingUp,
    title: "Performance Analytics",
    description: "Track your learning efficiency and improvements",
  },
  {
    icon: Layers,
    title: "Concept Mapping",
    description: "Visualize relationships between different concepts",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description: "Get intelligent recommendations and suggestions",
  },
];

export default function Features() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Powerful Features for
            <span className="gradient-text"> Deep Learning</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Discover how AuraMind transforms video learning with AI-powered
            features designed for comprehensive understanding.
          </motion.p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="mb-24 last:mb-0"
            >
              <div className="glass-card p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      {feature.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      {feature.description}
                    </p>
                    <p className="text-foreground mb-6 leading-relaxed">
                      {feature.details}
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {feature.benefits.map((benefit, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 glass-card p-4"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <p className="text-sm text-foreground">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              More Powerful Capabilities
            </h2>
            <p className="text-muted-foreground text-lg">
              Additional features that enhance your learning experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="feature-card"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Experience the power of AI-powered video learning with AuraMind.
              Start your journey today.
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-glass-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 AuraMind. AI-Powered Learning Platform.
          </p>
        </div>
      </footer>
    </div>
  );
}
