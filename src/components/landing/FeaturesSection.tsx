import { motion } from "framer-motion";
import { Clock, Image, Brain, Zap, Eye, MessageSquare } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Temporal Video Analysis",
    description:
      "AI extracts key moments, concepts, and insights from hour-long videos with precise timestamps.",
  },
  {
    icon: Image,
    title: "4K Visual Blueprints",
    description:
      "Generate high-resolution diagrams and visual summaries that crystallize complex concepts.",
  },
  {
    icon: Brain,
    title: "High-Reasoning Tutoring",
    description:
      "See the AI's internal deliberation process as it reasons through problems step-by-step.",
  },
  {
    icon: Eye,
    title: "The Thought Window",
    description:
      "Watch the model think in real-time with transparent reasoning chains and thought signatures.",
  },
  {
    icon: MessageSquare,
    title: "Interactive Q&A",
    description:
      "Ask follow-up questions and get personalized explanations tied to specific video moments.",
  },
  {
    icon: Zap,
    title: "Agentic Learning",
    description:
      "Track your progress with intelligent metrics: time saved, concepts mastered, and efficiency gains.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function FeaturesSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Built for Deep Understanding
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            AuraMind combines advanced AI reasoning with intuitive design to
            transform how you learn from video content.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="feature-card"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
