import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import {
  Upload,
  Brain,
  MessageSquare,
  Eye,
  CheckCircle,
  ArrowRight,
  Video,
  Sparkles,
  Zap,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Video",
    description:
      "Start by uploading your educational video. AuraMind supports various formats and can process videos up to 60+ minutes long.",
    details: [
      "Drag and drop or browse to upload",
      "Supports MP4, MOV, AVI, and more",
      "Automatic video processing begins",
      "Real-time upload progress tracking",
    ],
    color: "from-primary to-primary/50",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Analysis & Processing",
    description:
      "Our advanced Gemini AI analyzes your video content, extracting key concepts, timestamps, and generating visual insights.",
    details: [
      "Frame-by-frame content analysis",
      "Audio transcription and processing",
      "Concept extraction and mapping",
      "Temporal marker identification",
    ],
    color: "from-accent to-accent/50",
  },
  {
    number: "03",
    icon: Eye,
    title: "Watch the Thought Process",
    description:
      "Observe the AI's reasoning in real-time through the Thought Window. See how it processes and understands the content.",
    details: [
      "Real-time reasoning visualization",
      "Transparent decision-making process",
      "Step-by-step analysis display",
      "Interactive thought exploration",
    ],
    color: "from-primary to-accent",
  },
  {
    number: "04",
    icon: MessageSquare,
    title: "Interactive Learning",
    description:
      "Engage with your AI tutor. Ask questions, get explanations, and explore concepts with personalized guidance.",
    details: [
      "Natural language conversations",
      "Context-aware responses",
      "Video timestamp integration",
      "Personalized learning paths",
    ],
    color: "from-accent to-primary",
  },
  {
    number: "05",
    icon: Sparkles,
    title: "Visual Blueprints",
    description:
      "Generate stunning 4K visual diagrams that help you visualize complex concepts and relationships.",
    details: [
      "Automatic diagram generation",
      "4K resolution output",
      "Exportable formats",
      "Interactive exploration",
    ],
    color: "from-primary to-accent",
  },
  {
    number: "06",
    icon: Target,
    title: "Track Your Progress",
    description:
      "Monitor your learning journey with detailed analytics, efficiency metrics, and progress tracking.",
    details: [
      "Time saved calculations",
      "Concepts mastered tracking",
      "Efficiency metrics",
      "Learning insights and recommendations",
    ],
    color: "from-accent to-primary",
  },
];

const benefits = [
  {
    icon: Zap,
    title: "10x Faster Learning",
    description:
      "Skip to the exact moments you need, saving hours of video watching time.",
  },
  {
    icon: Brain,
    title: "Deeper Understanding",
    description:
      "AI-powered explanations help you grasp complex concepts more thoroughly.",
  },
  {
    icon: Video,
    title: "Better Retention",
    description:
      "Visual blueprints and interactive learning improve long-term memory retention.",
  },
];

export default function HowItWorks() {
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
            How AuraMind
            <span className="gradient-text"> Works</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            A simple, powerful process that transforms long videos into
            personalized learning experiences.
          </motion.p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="mb-20 last:mb-0"
            >
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Left Side - Number and Icon */}
                <div className="flex-shrink-0 lg:w-48">
                  <div className="flex items-center gap-4 mb-4 lg:mb-0 lg:flex-col lg:text-center">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <step.icon className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <div className="lg:mt-4">
                      <div className="text-6xl font-bold text-muted-foreground/20">
                        {step.number}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="flex-1 glass-card p-8 md:p-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {step.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {step.description}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {step.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 glass-card p-4"
                      >
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground">{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connector Line (except last) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex justify-center my-8">
                  <div className="w-px h-16 bg-gradient-to-b from-primary/50 to-accent/50" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose AuraMind?
            </h2>
            <p className="text-muted-foreground text-lg">
              Experience the benefits of AI-powered learning
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="feature-card text-center"
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
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
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Transform your video learning experience today. Upload your first
              video and see the magic happen.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
                  Try It Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/features">
                <Button size="lg" variant="outline" className="border-glass-border">
                  Learn More
                </Button>
              </Link>
            </div>
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
