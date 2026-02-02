import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  change?: string;
  icon: LucideIcon;
}

interface StatsCardProps {
  stats: StatItem[];
}

export function StatsCard({ stats }: StatsCardProps) {
  return (
    <div className="glass-card p-4 space-y-4">
      <h3 className="text-sm font-medium text-muted-foreground">
        Agentic Progress
      </h3>
      <div className="space-y-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-foreground">{stat.label}</p>
                {stat.change && (
                  <p className="text-xs text-success">{stat.change}</p>
                )}
              </div>
            </div>
            <span className="text-lg font-semibold text-foreground">
              {stat.value}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
