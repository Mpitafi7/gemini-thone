import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Film, X, CheckCircle } from "lucide-react";

interface VideoDropzoneProps {
  onFileSelect: (file: File) => void;
}

export function VideoDropzone({ onFileSelect }: VideoDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files[0]) {
        const file = files[0];
        if (file.type.startsWith("video/")) {
          setSelectedFile(file);
          onFileSelect(file);
        }
      }
    },
    [onFileSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files[0]) {
        setSelectedFile(files[0]);
        onFileSelect(files[0]);
      }
    },
    [onFileSelect]
  );

  const clearFile = () => {
    setSelectedFile(null);
  };

  return (
    <div
      className={`dropzone p-12 text-center transition-all duration-300 ${
        isDragging ? "dropzone-active" : ""
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="video/*"
        onChange={handleFileInput}
        className="hidden"
        id="video-upload"
      />

      <AnimatePresence mode="wait">
        {selectedFile ? (
          <motion.div
            key="selected"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="space-y-4"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-success/20 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <div>
              <p className="text-foreground font-medium">{selectedFile.name}</p>
              <p className="text-muted-foreground text-sm">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={clearFile}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
              Remove file
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="space-y-4"
          >
            <motion.div
              animate={{ y: isDragging ? -5 : 0 }}
              className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center"
            >
              {isDragging ? (
                <Film className="w-8 h-8 text-primary" />
              ) : (
                <Upload className="w-8 h-8 text-muted-foreground" />
              )}
            </motion.div>
            <div>
              <p className="text-foreground font-medium">
                {isDragging
                  ? "Drop your video here"
                  : "Drag and drop your video"}
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                or{" "}
                <label
                  htmlFor="video-upload"
                  className="text-primary hover:underline cursor-pointer"
                >
                  browse files
                </label>
              </p>
              <p className="text-muted-foreground/60 text-xs mt-3">
                Supports up to 1-hour videos • MP4, WebM, MOV
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
