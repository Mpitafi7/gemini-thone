import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { User, Bell, Palette, Zap, Shield, HelpCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AVAILABLE_MODELS, getGeminiModel } from "@/lib/gemini";

const settingsSections = [
  {
    title: "Profile",
    icon: User,
    description: "Manage your account details",
  },
  {
    title: "Notifications",
    icon: Bell,
    description: "Configure alert preferences",
  },
  {
    title: "Appearance",
    icon: Palette,
    description: "Customize the interface",
  },
  {
    title: "AI Settings",
    icon: Zap,
    description: "Configure AI behavior",
  },
  {
    title: "Privacy",
    icon: Shield,
    description: "Data and security settings",
  },
  {
    title: "Help",
    icon: HelpCircle,
    description: "Get support and documentation",
  },
];

export default function Settings() {
  const [apiKey, setApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("gemini-pro");
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isModelSaved, setIsModelSaved] = useState(false);
  const { toast } = useToast();

  // Load saved API key and model
  useEffect(() => {
    const savedKey = localStorage.getItem("gemini_api_key");
    if (savedKey) {
      setApiKey(savedKey);
    } else {
      // Also check environment variable
      const envKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (envKey) {
        setApiKey(envKey);
      }
    }
    
    // Load saved model
    const savedModel = getGeminiModel();
    setSelectedModel(savedModel);
  }, []);

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      // Save to localStorage
      localStorage.setItem("gemini_api_key", apiKey.trim());
      setIsSaved(true);
      toast({
        title: "Success",
        description: "API key saved successfully!",
      });
      
      // Reset saved state after 3 seconds
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save API key",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    setIsModelSaved(false);
  };

  const handleSaveModel = () => {
    try {
      localStorage.setItem("gemini_model", selectedModel);
      setIsModelSaved(true);
      toast({
        title: "Success",
        description: `Model changed to ${AVAILABLE_MODELS.find(m => m.value === selectedModel)?.label || selectedModel}`,
      });
      
      // Reset saved state after 3 seconds
      setTimeout(() => setIsModelSaved(false), 3000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save model preference",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your preferences and account settings
          </p>
        </motion.div>

        {/* Settings Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
        >
          {settingsSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="glass-card-hover p-4 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <Separator className="my-8" />

        {/* Quick Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <h2 className="text-xl font-semibold">Quick Settings</h2>

          <div className="glass-card p-6 space-y-6">
            {/* API Key */}
            <div className="space-y-2">
              <Label htmlFor="api-key">Gemini API Key</Label>
              <div className="flex gap-2">
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value);
                    setIsSaved(false);
                  }}
                  className="bg-muted/50 border-glass-border"
                />
                <Button 
                  variant="outline" 
                  className="border-glass-border"
                  onClick={handleSaveApiKey}
                  disabled={isSaving || !apiKey.trim()}
                >
                  {isSaved ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Saved
                    </>
                  ) : isSaving ? (
                    "Saving..."
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Required for advanced AI features. Get your key from{" "}
                <a 
                  href="https://makersuite.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google AI Studio
                </a>
              </p>
            </div>

            <Separator />

            {/* Model Selection */}
            <div className="space-y-2">
              <Label htmlFor="model-select">Gemini Model</Label>
              <div className="flex gap-2">
                <Select value={selectedModel} onValueChange={handleModelChange}>
                  <SelectTrigger 
                    id="model-select"
                    className="flex-1 bg-muted/50 border-glass-border"
                  >
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_MODELS.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{model.label}</span>
                          <span className="text-xs text-muted-foreground">
                            {model.description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  className="border-glass-border"
                  onClick={handleSaveModel}
                  disabled={isModelSaved}
                >
                  {isModelSaved ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Saved
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Choose which Gemini model to use for AI responses. Different models have different capabilities and speeds.
              </p>
            </div>

            <Separator />

            {/* Toggle Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Show Thought Process</Label>
                  <p className="text-sm text-muted-foreground">
                    Display AI reasoning in the Thought Window
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-generate Blueprints</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically create visual diagrams
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Streaming Responses</Label>
                  <p className="text-sm text-muted-foreground">
                    Show AI responses as they're generated
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Save Session History</Label>
                  <p className="text-sm text-muted-foreground">
                    Keep a record of all conversations
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
