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
}

function ToolbarButton({
  onClick,
  isActive,
  children,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md transition-all duration-200 hover:bg-light-base/40 cursor-pointer",
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
      )}>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}>
        <ToolTipComponent content="Bold">
          <Bold size={32} className="p-2" />
        </ToolTipComponent>
      </ToolbarButton>


      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}>
        <ToolTipComponent content="Underline">
          <UnderlineIcon size={32} className="p-2" />
        </ToolTipComponent>
      </ToolbarButton>


      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}>
        <ToolTipComponent content="Italic">
          <Italic size={32} className="p-2" />
        </ToolTipComponent>
      </ToolbarButton>


      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}>
        <ToolTipComponent content="Strikethrough">
          <Strikethrough size={32} className="p-2" />
        </ToolTipComponent>
      </ToolbarButton>
    </div>
  );
}
