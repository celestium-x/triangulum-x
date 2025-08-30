'use client';

import { motion } from 'motion/react';
import type { Variants } from 'motion/react';

interface ChartNoAxesProps extends React.SVGAttributes<SVGSVGElement> {
    width?: number;
    height?: number;
    strokeWidth?: number;
    stroke?: string;
    animateState?: 'normal' | 'animate';
}

const lineVariants: Variants = {
    normal: { pathLength: 1, opacity: 1 },
    animate: (i: number) => ({
        pathLength: [0, 1],
        opacity: [0, 1],
        transition: { delay: i * 0.1, duration: 0.4, ease: 'easeInOut' },
    }),
};

const ChartNoAxes = ({
    width = 28,
    height = 28,
    strokeWidth = 2,
    stroke = '#ffffff',
    animateState = 'normal',
    ...props
}: ChartNoAxesProps) => {
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
                <motion.path
                    d="M12 16v5"
                    variants={lineVariants}
                    initial="normal"
                    animate={animateState}
                    custom={5}
                />
                <motion.path
                    d="M16 14v7"
                    variants={lineVariants}
                    initial="normal"
                    animate={animateState}
                    custom={4}
                />
                <motion.path
                    d="M20 10v11"
                    variants={lineVariants}
                    initial="normal"
                    animate={animateState}
                    custom={3}
                />
                <motion.path
                    d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"
                    variants={lineVariants}
                    initial="normal"
                    animate={animateState}
                    custom={2}
                />
                <motion.path
                    d="M4 18v3"
                    variants={lineVariants}
                    initial="normal"
                    animate={animateState}
                    custom={1}
                />
                <motion.path
                    d="M8 14v7"
                    variants={lineVariants}
                    initial="normal"
                    animate={animateState}
                    custom={0}
                />
            </svg>
        </div>
    );
};

export { ChartNoAxes };
