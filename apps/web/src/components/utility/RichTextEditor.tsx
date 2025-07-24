import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/react";
import ToolTipComponent from "./TooltipComponent";

interface FormattingToolbarProps {
  editor: Editor | null;
  className?: string;
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
  title: string;
}

function ToolbarButton({
  onClick,
  isActive,
  children,
  title,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={cn(
        "p-2 rounded-md transition-all duration-200 hover:bg-light-base/40 cursor-pointer",
        isActive ? "bg-light-base/30 text-white" : "text-gray-600"
      )}
    >
      {children}
    </button>
  );
}

export default function FormattingToolbar({
  editor,
  className,
}: FormattingToolbarProps) {
  if (!editor) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-1 p-2 border border-neutral-300/50 rounded-md bg-light-base/20",
        className
      )}
    >
      <ToolTipComponent content="Bold (Ctrl+B)">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title="Bold (Ctrl+B)"
        >
          <Bold size={16} />
        </ToolbarButton>
      </ToolTipComponent>

      <ToolTipComponent content="Underline (Ctrl+U)">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          title="Underline (Ctrl+U)"
        >
          <UnderlineIcon size={16} />
        </ToolbarButton>
      </ToolTipComponent>

      <ToolTipComponent content="Italic (Ctrl+I)">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title="Italic (Ctrl+I)"
        >
          <Italic size={16} />
        </ToolbarButton>
      </ToolTipComponent>

      <ToolTipComponent content="Strikethrough (Ctrl+Shift+S)">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          title="Strikethrough (Ctrl+Shift+S)"
        >
          <Strikethrough size={16} />
        </ToolbarButton>
      </ToolTipComponent>
    </div>
  );
}
