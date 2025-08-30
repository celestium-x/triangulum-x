// components/ui/animated-icons/Folder.tsx
'use client';

import React from 'react';

export type AnimateState = 'normal' | 'animate';

export interface FolderProps extends React.SVGProps<SVGSVGElement> {
    width?: number | string;
    height?: number | string;
    strokeWidth?: number;
    stroke?: string;
    animateState?: AnimateState;
}

/**
 * Animated Folder Icon (strokes only)
 *
 * Props:
 *  - width, height: size of the icon
 *  - strokeWidth: stroke width (default 0.6)
 *  - stroke: border / outline color
 *  - animateState: 'normal' | 'animate' (controls the animation)
 *
 * Example:
 *  <Folder width={120} height={120} animateState={hovered ? 'animate' : 'normal'} />
 */
export default function Folder({
    width = 120,
    height = 120,
    strokeWidth = 0.6,
    stroke = '#BA832A',
    animateState = 'normal',
    ...rest
}: FolderProps) {
    const isAnimating = animateState === 'animate';

    return (
        <>
            <svg
                {...rest}
                width={width}
                height={height}
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`folder-icon ${isAnimating ? 'is-anim' : ''}`}
                aria-hidden="true"
                role="img"
            >
                {/* Folder body */}
                <g className="folder-body" transform="translate(0,0)">
                    <rect
                        x="8"
                        y="40"
                        width="104"
                        height="56"
                        rx="6"
                        fill="none"
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                        strokeOpacity={0.9}
                    />
                </g>

                {/* Folder tab / lid */}
                <g
                    className="folder-lid"
                    transform="translate(0,-19)"
                    style={{ transformOrigin: '28% 40%' }}
                >
                    <path
                        d="M10 40h34l8 8h58a2 2 0 0 1 2 2v6H10v-16z"
                        fill="none"
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                </g>

                {/* Sparkles */}
                <g className="sparks">
                    <g className="spark s1" transform="translate(86,26) scale(0.9)">
                        <rect x="-1.5" y="-6" width="3" height="12" rx="1" fill={stroke} />
                        <rect x="-6" y="-1.5" width="12" height="3" rx="1" fill={stroke} />
                    </g>

                    <g className="spark s2" transform="translate(64,18) scale(0.7)">
                        <rect x="-1.5" y="-5" width="3" height="10" rx="1" fill={stroke} />
                        <rect x="-5" y="-1.5" width="10" height="3" rx="1" fill={stroke} />
                    </g>

                    <g className="spark s3" transform="translate(96,46) scale(0.6)">
                        <rect x="-1.2" y="-4" width="2.4" height="8" rx="1" fill={stroke} />
                        <rect x="-4" y="-1.2" width="8" height="2.4" rx="1" fill={stroke} />
                    </g>
                </g>

                {/* Small accent line */}
                <line
                    x1="18"
                    y1="62"
                    x2="102"
                    y2="62"
                    stroke={stroke}
                    strokeWidth={strokeWidth / 1.2}
                    strokeLinecap="round"
                    opacity={0.12}
                />
            </svg>

            <style jsx>{`
                .folder-icon {
                    display: block;
                    will-change: transform;
                }

                .folder-lid path {
                    transform-origin: 28% 40%;
                    transform-box: fill-box;
                    transition:
                        transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
                        filter 300ms ease,
                        opacity 200ms ease;
                }

                .folder-body {
                    transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
                }

                .sparks {
                    opacity: 0;
                    transform-origin: center;
                    transition: opacity 200ms ease;
                }

                .spark rect {
                    transform-origin: center;
                }

                .is-anim .folder-lid path {
                    animation: lid-open 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }

                .is-anim .folder-body {
                    animation: body-pop 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }

                .is-anim .sparks {
                    opacity: 1;
                    animation: sparks-pop 900ms ease forwards;
                }

                .is-anim .spark.s1 rect {
                    animation: spark-spin 900ms ease forwards;
                }
                .is-anim .spark.s2 rect {
                    animation: spark-spin 920ms ease 80ms forwards;
                }
                .is-anim .spark.s3 rect {
                    animation: spark-spin 980ms ease 140ms forwards;
                }

                @keyframes lid-open {
                    0% {
                        transform: rotate(0deg) translateY(0px);
                    }
                    60% {
                        transform: rotate(-18deg) translateY(-8px);
                    }
                    80% {
                        transform: rotate(-12deg) translateY(-5px);
                    }
                    100% {
                        transform: rotate(-15deg) translateY(-6px);
                    }
                }

                @keyframes body-pop {
                    0% {
                        transform: translateY(0px) scale(1);
                    }
                    50% {
                        transform: translateY(-6px) scale(1.02);
                    }
                    100% {
                        transform: translateY(-3px) scale(1.01);
                    }
                }

                @keyframes sparks-pop {
                    0% {
                        opacity: 0;
                        transform: scale(0.6) translateY(4px);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.05) translateY(-2px);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }

                @keyframes spark-spin {
                    0% {
                        transform: scale(0.2) rotate(0deg);
                        opacity: 0;
                    }
                    60% {
                        transform: scale(1.08) rotate(20deg);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(1) rotate(0deg);
                        opacity: 1;
                    }
                }
            `}</style>
        </>
    );
}
