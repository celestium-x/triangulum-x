'use client';

import { motion } from 'motion/react';
import type { Variants } from 'motion/react';

const circles = [
    { cx: 19, cy: 5 }, // Top right
    { cx: 12, cy: 5 }, // Top middle
    { cx: 19, cy: 12 }, // Middle right
    { cx: 5, cy: 5 }, // Top left
    { cx: 12, cy: 12 }, // Center
    { cx: 19, cy: 19 }, // Bottom right
    { cx: 5, cy: 12 }, // Middle left
    { cx: 12, cy: 19 }, // Bottom middle
    { cx: 5, cy: 19 }, // Bottom left
];

interface GripProps extends React.SVGAttributes<SVGSVGElement> {
    width?: number;
    height?: number;
    strokeWidth?: number;
    stroke?: string;
    animateState?: 'normal' | 'animate';
}

const circleVariants: Variants = {
    normal: { opacity: 1 },
    animate: (i: number) => ({
        opacity: [0.3, 1],
        transition: {
            delay: i * 0.1,
            duration: 0.2,
            repeat: 0,
            ease: 'easeInOut',
        },
    }),
};

const Grip = ({
    width = 28,
    height = 28,
    strokeWidth = 2,
    stroke = '#ffffff',
    animateState = 'normal',
    ...props
}: GripProps) => {
    return (
        <div
            style={{
                cursor: 'pointer',
                userSelect: 'none',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
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
                {circles.map((circle, index) => (
                    <motion.circle
                        key={`${circle.cx}-${circle.cy}`}
                        cx={circle.cx}
                        cy={circle.cy}
                        r="1"
                        variants={circleVariants}
                        initial="normal"
                        animate={animateState}
                        custom={index}
                    />
                ))}
            </svg>
        </div>
    );
};

export { Grip };
