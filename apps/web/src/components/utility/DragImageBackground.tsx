'use client';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
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

    if (!dragActive) return null;

    return createPortal(
        <>
            <div className="fixed inset-0 z-[998]" />

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