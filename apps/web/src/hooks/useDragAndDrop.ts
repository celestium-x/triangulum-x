import { useEffect, useState, useCallback } from 'react';

interface UseDragAndDropOptions {
    onDropFile: (file: File, preview: string) => void;
    acceptedTypes?: string[]; // Optional: filter file types
}

interface UseDragAndDropReturn {
    dragActive: boolean;
    dragCounter: number;
}

export function useDragAndDrop({
    onDropFile,
    acceptedTypes
}: UseDragAndDropOptions): UseDragAndDropReturn {
    const [dragActive, setDragActive] = useState(false);
    const [dragCounter, setDragCounter] = useState(0);

    const isValidFileType = useCallback((file: File): boolean => {
        if (!acceptedTypes || acceptedTypes.length === 0) return true;
        return acceptedTypes.some(type => file.type.startsWith(type));
    }, [acceptedTypes]);

    useEffect(() => {
        const handleDragEnter = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragCounter((prev) => prev + 1);
            setDragActive(true);
        };

        const handleDragLeave = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragCounter((prev) => {
                const next = prev - 1;
                if (next === 0) setDragActive(false);
                return next;
            });
        };

        const handleDragOver = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
        };

        const handleDrop = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
            setDragCounter(0);

            if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
                const file = e.dataTransfer.files[0]!;

                // Optional file type validation
                if (!isValidFileType(file)) {
                    console.warn(`File type ${file.type} is not accepted`);
                    return;
                }

                const preview = URL.createObjectURL(file);
                onDropFile(file, preview);
                e.dataTransfer.clearData();
            }
        };

        window.addEventListener('dragenter', handleDragEnter);
        window.addEventListener('dragleave', handleDragLeave);
        window.addEventListener('dragover', handleDragOver);
        window.addEventListener('drop', handleDrop);

        return () => {
            window.removeEventListener('dragenter', handleDragEnter);
            window.removeEventListener('dragleave', handleDragLeave);
            window.removeEventListener('dragover', handleDragOver);
            window.removeEventListener('drop', handleDrop);
        };
    }, [onDropFile, isValidFileType]);

    return {
        dragActive,
        dragCounter,
    };
}