import { MessageCircle, X } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";

interface TextSelectionPopupProps {
  selectedText: string;
  position: { x: number; y: number };
  onAskQuestion: () => void;
  onClose: () => void;
}

export function TextSelectionPopup({ 
  selectedText, 
  position, 
  onAskQuestion, 
  onClose 
}: TextSelectionPopupProps) {
  if (!selectedText) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      className="fixed z-50 bg-primary text-primary-foreground rounded-lg shadow-lg px-3 py-2 flex items-center space-x-2"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -100%) translateY(-10px)'
      }}
    >
      <Button 
        size="sm" 
        variant="ghost" 
        className="text-primary-foreground hover:bg-primary-foreground/20 h-8"
        onClick={onAskQuestion}
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        AI에게 질문하기
      </Button>
      <Button 
        size="sm" 
        variant="ghost" 
        className="text-primary-foreground hover:bg-primary-foreground/20 h-8 w-8 p-0"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}
