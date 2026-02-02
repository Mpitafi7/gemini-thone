import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, Zap } from "lucide-react";

interface ThoughtLine {
  id: string;
  type: "thinking" | "analyzing" | "insight" | "conclusion";
  content: string;
  timestamp: string;
}

interface ThoughtWindowProps {
  thoughts: ThoughtLine[];
  isProcessing?: boolean;
}

const typeColors: Record<ThoughtLine["type"], string> = {
  thinking: "text-muted-foreground",
  analyzing: "text-warning",
  insight: "text-primary",
  conclusion: "text-success",
};

const typeLabels: Record<ThoughtLine["type"], string> = {
  thinking: "THINKING",
  analyzing: "ANALYZING",
  insight: "INSIGHT",
  conclusion: "CONCLUSION",
};

export function ThoughtWindow({
  thoughts,
  isProcessing = false,
}: ThoughtWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [thoughts]);

  return (
    <div className="terminal-window h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-glass-border">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-terminal-text" />
          <span className="font-mono text-sm text-terminal-text">
            AuraMind Reasoning
          </span>
        </div>
        {isProcessing && (
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center gap-2 text-xs text-primary"
          >
            <Zap className="w-3 h-3" />
            Processing
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto scrollbar-thin space-y-1"
      >
        {thoughts.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm font-mono">
            Waiting for input...
          </div>
        ) : (
          thoughts.map((thought, index) => (
            <motion.div
              key={thought.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="thought-line font-mono text-sm"
            >
              <span className="text-muted-foreground/50">{thought.timestamp}</span>
              <span className={`ml-2 ${typeColors[thought.type]}`}>
                [{typeLabels[thought.type]}]
              </span>
              <span className="ml-2 text-foreground/90">{thought.content}</span>
            </motion.div>
          ))
        )}

        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="thought-line font-mono text-sm flex items-center gap-2"
          >
            <span className="text-muted-foreground/50">--:--:--</span>
            <span className="text-primary animate-typing">█</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
