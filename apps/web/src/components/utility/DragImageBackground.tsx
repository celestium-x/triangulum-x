'use client';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function DragImageBackground({
    onDropFile,
}: {
    onDropFile: (file: File, preview: string) => void;
}) {
    const { dragActive } = useDragAndDrop({
        onDropFile,
        acceptedTypes: ['image/']
    });

    const [isInternalDrag, setIsInternalDrag] = useState(false);
    
    useEffect(() => {
        const handleInternalDragStart = (e: DragEvent) => {
            if (e.dataTransfer?.types.includes('application/x-option-drag')) {
                setIsInternalDrag(true);
            }
        };

        const handleInternalDragEnd = () => {
            setIsInternalDrag(false);
        };

        document.addEventListener('dragstart', handleInternalDragStart);
        document.addEventListener('dragend', handleInternalDragEnd);

        return () => {
            document.removeEventListener('dragstart', handleInternalDragStart);
            document.removeEventListener('dragend', handleInternalDragEnd);
        };
    }, []);
    
    if (!dragActive || isInternalDrag) return null;

    return createPortal(
        <>
            {dragActive && (
                <div className="fixed inset-0 z-[999] bg-secDark/70 backdrop-blur-md flex items-center justify-center">
                    <div className="text-white text-lg font-semibold px-6 py-4 bg-black/30 border border-white/20 rounded-lg">
                        Drop your image here
                    </div>
                </div>

            )}
        </>,
        document.body
    );
}