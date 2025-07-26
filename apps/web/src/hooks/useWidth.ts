import { RefObject, useEffect, useState } from 'react';

export const useWidth = (ref: RefObject<HTMLElement | null>, initialWidth = 0) => {
    const [width, setWidth] = useState<number>(initialWidth);

    useEffect(() => {
        if (!ref.current) return;

        const updateWidth = () => {
            setWidth(ref.current?.offsetWidth || 0);
        };

        updateWidth();

        const resizeObserver = new ResizeObserver(updateWidth);
        resizeObserver.observe(ref.current);

        return () => resizeObserver.disconnect();
    }, [ref]);

    return width;
};

export function getImageContainerWidth(canvasWidth: number): string {
    if (canvasWidth === 0) return 'w-[30rem]';

    if (canvasWidth < 480) {
        return 'w-[28rem]';
    } else if (canvasWidth < 768) {
        return 'w-[32rem]';
    } else if (canvasWidth < 1024) {
        return 'w-[36rem]';
    } else if (canvasWidth < 1440) {
        return 'w-[40rem]';
    } else {
        return 'w-[44rem]';
    }
}
