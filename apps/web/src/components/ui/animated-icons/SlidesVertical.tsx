'use client';

import type { Variants } from 'motion/react';
import { motion } from 'motion/react';

const lineVariants: Variants = {
    normal: { pathLength: 1, opacity: 1 },
    animate: (i: number) => ({
        pathLength: [0, 1],
        opacity: [0, 1],
        transition: {
            duration: 0.3,
            delay: i * 0.1,
            ease: 'easeInOut',
        },
    }),
};

interface SlidersVerticalProps extends React.SVGAttributes<SVGSVGElement> {
    width?: number;
    height?: number;
    strokeWidth?: number;
    stroke?: string;
    animateState?: 'normal' | 'animate';
}

export default function SlidesVertical ({
    width = 28,
    height = 28,
    strokeWidth = 2,
    stroke = '#ffffff',
    animateState = 'normal',
    ...props
}: SlidersVerticalProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            {[
                ['4', '21', '14'], // (x1, y1, y2) simplified for readability
                ['4', '10', '3'],
                ['12', '21', '12'],
                ['12', '8', '3'],
                ['20', '21', '16'],
                ['20', '12', '3'],
            ].map(([x, y1, y2], i) => (
                <motion.line
                    key={i}
                    x1={x}
                    x2={x}
                    y1={y1}
                    y2={y2}
                    variants={lineVariants}
                    animate={animateState}
                    custom={i}
                />
            ))}

            <motion.line
                x1="2"
                x2="6"
                y1="14"
                y2="14"
                variants={lineVariants}
                animate={animateState}
                custom={6}
            />
            <motion.line
                x1="10"
                x2="14"
                y1="8"
                y2="8"
                variants={lineVariants}
                animate={animateState}
                custom={7}
            />
            <motion.line
                x1="18"
                x2="22"
                y1="16"
                y2="16"
                variants={lineVariants}
                animate={animateState}
                custom={8}
            />
        </svg>
    );
};
