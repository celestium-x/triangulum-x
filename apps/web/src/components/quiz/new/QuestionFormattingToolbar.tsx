import { Bold, Italic, Underline } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionFormattingToolbarProps {
  onBold: () => void;
  onItalic: () => void;
  onUnderline: () => void;
  isBold?: boolean;
  isItalic?: boolean;
  isUnderline?: boolean;
  className?: string;
}

export default function QuestionFormattingToolbar({
  onBold,
  onItalic,
  onUnderline,
  isBold = false,
  isItalic = false,
  isUnderline = false,
  className
}: QuestionFormattingToolbarProps) {
  const buttonBaseClass = "p-2 rounded-md transition-all duration-200 hover:bg-white/20 active:scale-95";
  const activeClass = "bg-white/30 shadow-sm";
  const iconClass = "w-4 h-4";

  return (
    <div className={cn(
      "flex items-center justify-center gap-2 p-2 bg-black/10 rounded-lg backdrop-blur-sm border border-white/20",
      className
    )}>
      <button
        onClick={onBold}
        className={cn(
          buttonBaseClass,
          isBold && activeClass
        )}
        type="button"
        aria-label="Bold"
      >
        <Bold className={iconClass} />
      </button>
      
      <button
        onClick={onItalic}
        className={cn(
          buttonBaseClass,
          isItalic && activeClass
        )}
        type="button"
        aria-label="Italic"
      >
        <Italic className={iconClass} />
      </button>
      
      <button
        onClick={onUnderline}
        className={cn(
          buttonBaseClass,
          isUnderline && activeClass
        )}
        type="button"
        aria-label="Underline"
      >
        <Underline className={iconClass} />
      </button>
    </div>
  );
}