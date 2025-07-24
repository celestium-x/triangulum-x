import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface DragImageBGProps {
    children: React.ReactNode;
    className?: string;
    onBackgroundClick?: () => void;
    dragActive?: boolean;
}

export default function DragImageBackground({ children, className, onBackgroundClick, dragActive }: DragImageBGProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        document.body.style.overflow = 'hidden';

        return () => {
            setMounted(false);
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleBackgroundClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && onBackgroundClick) {
            onBackgroundClick();
        }
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && onBackgroundClick) {
                onBackgroundClick();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onBackgroundClick]);

    const backgroundElement = (
        <div
            onClick={handleBackgroundClick}
            className={cn(
                "fixed inset-0 z-50 w-screen h-screen flex items-center justify-center",
                "bg-black/80 backdrop-blur-sm ",
                "p-4",
                className
            )}
        >
            <div className="relative max-w-[95vw] max-h-[95vh] rounded-4xl overflow-hidden bg-white dark:bg-[#051113] shadow-2xl">
                {children}
            </div>
        </div>
    );

    if (!mounted) return null;
    return createPortal(backgroundElement, document.body);
}