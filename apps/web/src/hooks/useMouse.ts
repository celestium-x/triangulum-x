'use client';

import { useState, useRef, useEffect, RefObject } from 'react';

type MousePosition = {
    elementX: number | null;
    elementY: number | null;
};

export function useMouse(): [MousePosition, RefObject<HTMLDivElement>] {
    const [mouse, setMouse] = useState<MousePosition>({
        elementX: null,
        elementY: null,
    });

    // ✅ allow null in the ref type
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            setMouse({
                elementX: e.clientX - rect.left,
                elementY: e.clientY - rect.top,
            });
        };

        const handleMouseLeave = () => {
            setMouse({ elementX: null, elementY: null });
        };

        const node = ref.current;
        if (node) {
            node.addEventListener('mousemove', handleMouseMove);
            node.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (node) {
                node.removeEventListener('mousemove', handleMouseMove);
                node.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    // ✅ cast ref type so caller doesn't get the TS2322 error
    return [mouse, ref as RefObject<HTMLDivElement>];
}
