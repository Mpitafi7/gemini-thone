import { motion } from "framer-motion";
import { Download, Wand2, Maximize2 } from "lucide-react";
import { Button } from "./button";

interface Blueprint {
  id: string;
  title: string;
  imageUrl: string;
  timestamp: string;
}

interface BlueprintGalleryProps {
  blueprints: Blueprint[];
}

export function BlueprintGallery({ blueprints }: BlueprintGalleryProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-foreground">Visual Blueprints</h3>
        <span className="text-xs text-muted-foreground">4K Resolution</span>
      </div>

      {blueprints.length === 0 ? (
        <div className="glass-card p-8 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center mb-3">
            <Wand2 className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            AI-generated diagrams will appear here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {blueprints.map((blueprint, index) => (
            <motion.div
              key={blueprint.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="blueprint-card group"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={blueprint.imageUrl}
                  alt={blueprint.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-2 left-2 right-2 flex gap-2">
                    <Button size="sm" variant="secondary" className="flex-1 h-8">
                      <Download className="w-3 h-3 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" variant="secondary" className="h-8">
                      <Maximize2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium truncate">{blueprint.title}</p>
                <p className="text-xs text-muted-foreground">
                  {blueprint.timestamp}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
