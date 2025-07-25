
import { useCallback, useEffect, useState } from 'react';

interface UseDragAndDropProps {
    onDropFile: (file: File, preview: string) => void;
    acceptedTypes: string[];
}

export function useDragAndDrop({ onDropFile, acceptedTypes }: UseDragAndDropProps) {
    const [dragActive, setDragActive] = useState(false);

    const handleDragEnter = useCallback((e: DragEvent) => {
        e.preventDefault();

        
        if (e.dataTransfer?.types.includes('application/x-option-drag')) {
            return; 
        }

        
        const hasFiles = e.dataTransfer?.types.includes('Files');
        if (hasFiles) {
            setDragActive(true);
        }
    }, []);

    const handleDragLeave = useCallback((e: DragEvent) => {
        e.preventDefault();

        
        if (e.dataTransfer?.types.includes('application/x-option-drag')) {
            return;
        }

        
        if (e.clientX === 0 && e.clientY === 0) {
            setDragActive(false);
        }
    }, []);

    const handleDragOver = useCallback((e: DragEvent) => {
        e.preventDefault();

        
        if (e.dataTransfer?.types.includes('application/x-option-drag')) {
            return;
        }

        
        const hasFiles = e.dataTransfer?.types.includes('Files');
        if (hasFiles) {
            setDragActive(true);
        }
    }, []);

    const handleDrop = useCallback((e: DragEvent) => {
        e.preventDefault();
        setDragActive(false);

        
        if (e.dataTransfer?.types.includes('application/x-option-drag')) {
            return;
        }

        const files = e.dataTransfer?.files;
        if (!files || files.length === 0) return;

        const file = files[0]!;

        
        const isAccepted = acceptedTypes.some(type =>
            file.type.startsWith(type.replace('/', ''))
        );

        if (isAccepted) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const preview = event.target?.result as string;
                onDropFile(file, preview);
            };
            reader.readAsDataURL(file);
        }
    }, [onDropFile, acceptedTypes]);

    useEffect(() => {
        document.addEventListener('dragenter', handleDragEnter);
        document.addEventListener('dragleave', handleDragLeave);
        document.addEventListener('dragover', handleDragOver);
        document.addEventListener('drop', handleDrop);

        return () => {
            document.removeEventListener('dragenter', handleDragEnter);
            document.removeEventListener('dragleave', handleDragLeave);
            document.removeEventListener('dragover', handleDragOver);
            document.removeEventListener('drop', handleDrop);
        };
    }, [handleDragEnter, handleDragLeave, handleDragOver, handleDrop]);

    return { dragActive };
}