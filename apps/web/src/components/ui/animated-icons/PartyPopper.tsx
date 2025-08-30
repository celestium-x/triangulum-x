'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';

const linesVariants: Variants = {
    normal: {
        opacity: 1,
        pathLength: 1,
        scale: 1,
        translateX: 0,
        translateY: 0,
    },
    animate: {
        opacity: [0, 1],
        scale: [0.3, 1.1],
        pathLength: [0, 1],
        translateX: [-5, 0],
        translateY: [5, 0],
        transition: {
            type: 'spring',
            damping: 35,
            stiffness: 240,
            velocity: 0.3,
        },
    },
};

const dotsVariants: Variants = {
    normal: { opacity: 1, scale: 1, translateX: 0, translateY: 0 },
    animate: {
        opacity: [0, 1],
        translateX: [-5, 0],
        translateY: [5, 0],
        scale: [0.5, 1], // ✅ reduced to 2 keyframes
        transition: {
            type: 'spring',
            damping: 35,
            stiffness: 240,
        },
    },
};

const popperVariants: Variants = {
    normal: { translateX: 0, translateY: 0 },
    animate: {
        translateX: [-1.5, 0],
        translateY: [1.5, 0],
        transition: {
            type: 'spring',
            damping: 35,
            stiffness: 200,
            velocity: 0.3,
            mass: 4,
        },
    },
};

interface PartyPopperProps extends React.SVGAttributes<SVGSVGElement> {
    width?: number;
    height?: number;
    strokeWidth?: number;
    stroke?: string;
    animateState?: 'normal' | 'animate';
}

const PartyPopper = ({
    width = 28,
    height = 28,
    strokeWidth = 2,
    stroke = '#ffffff',
    animateState = 'normal',
    ...props
}: PartyPopperProps) => {
    const controls = useAnimation();

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
            onMouseEnter={() => controls.start('animate')}
            onMouseLeave={() => controls.start('normal')}
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
                    d="M5.8 11.3 2 22l10.7-3.79"
                    variants={popperVariants}
                    animate={animateState}
                />
                <motion.path
                    d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"
                    variants={popperVariants}
                    animate={animateState}
                />
                <motion.path d="M4 3h.01" variants={dotsVariants} animate={animateState} />
                <motion.path d="M22 8h.01" variants={dotsVariants} animate={animateState} />
                <motion.path d="M15 2h.01" variants={dotsVariants} animate={animateState} />
                <motion.path d="M22 20h.01" variants={dotsVariants} animate={animateState} />
                <motion.path
                    d="m14 10 1.21-1.06c0.16-0.84 0.9-1.44 1.76-1.44h0.38c0.88 0 1.55-0.77 1.45-1.63a2.9 2.9 0 0 1 1.96-3.12L22 2"
                    variants={linesVariants}
                    animate={animateState}
                    stroke="#FF6B6B"
                />
                <motion.path
                    d="M17 15h0.77c0.71 0 1.32-0.52 1.43-1.22c0.16-0.91 1.12-1.45 1.98-1.11L22 13"
                    variants={linesVariants}
                    animate={animateState}
                    stroke="#FFD93D"
                />
                <motion.path
                    d="M9 7V6.23c0-0.71 0.52-1.33 1.22-1.43c0.91-0.16 1.45-1.12 1.11-1.98L11 2"
                    variants={linesVariants}
                    animate={animateState}
                    stroke="#6BCB77"
                />
            </svg>
        </div>
    );
};

export { PartyPopper };
