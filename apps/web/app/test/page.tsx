'use client'
import React from "react";

export default function StaircaseBeam({
  width = 700,
  height = 200,
  duration = 4, // seconds for one loop
}: {
  width?: number;
  height?: number;
  duration?: number;
}) {
  // The staircase path: adjust segments to change step sizes.
  const pathD = `
    M 10 40
    L 110 40
    L 110 90
    L 210 90
    L 210 30
    L 310 30
    L 310 140
    L 410 140
    L 410 70
    L 510 70
    L 510 20
    L 610 20
  `;

  return (
    <div style={{ display: "inline-block", lineHeight: 0, padding: 8 }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Staircase beam animation"
      >
        <defs>
          {/* Gradient used for tail stroke */}
          <linearGradient id="tailGrad" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#9b5cf6" stopOpacity="0.0" />
            <stop offset="30%" stopColor="#9b5cf6" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#00f0ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="1" />
          </linearGradient>

          {/* small radial gradient for the head */}
          <radialGradient id="headGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="20%" stopColor="#aaffff" stopOpacity="1" />
            <stop offset="60%" stopColor="#00f0ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#00d0ff" stopOpacity="0.6" />
          </radialGradient>

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Path length trick: put a stroke for subtle guide (optional) */}
          <style>{`
            /* animations */
            .tail {
              stroke: url(#tailGrad);
              stroke-width: 8;
              stroke-linecap: round;
              stroke-linejoin: round;
              fill: none;
              filter: url(#glow);
              /* create a dash pattern that looks like a moving tail */
              stroke-dasharray: 200 800;
              animation: dashMove ${duration}s linear infinite;
            }

            .guide {
              stroke: rgba(255,255,255,0.06);
              stroke-width: 1;
              fill: none;
              stroke-linecap: round;
            }

            /* little sparkle/flare behind the head */
            .flare {
              opacity: 0.85;
              transform-origin: center;
              animation: flarePulse ${duration/2}s ease-in-out infinite;
            }

            @keyframes dashMove {
              from { stroke-dashoffset: 0; }
              to   { stroke-dashoffset: -1000; }
            }

            @keyframes flarePulse {
              0% { transform: scale(0.9); opacity: 0.7; }
              50%{ transform: scale(1.15); opacity: 1; }
              100%{ transform: scale(0.9); opacity: 0.7; }
            }
          `}</style>
        </defs>

        {/* optional faint guide path (makes staircase visible) */}
        <path d={pathD} className="guide" />

        {/* Tail stroke (same path) */}
        <path id="stairPath" d={pathD} className="tail" />

        {/* Moving head: small circle using animateMotion */}
        <g>
          {/* the head glow (larger, soft) */}
          <circle r="12" fill="url(#headGrad)" opacity="0.9" filter="url(#glow)">
            <animateMotion
              dur={`${duration}s`}
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath xlinkHref="#stairPath" />
            </animateMotion>
          </circle>

          {/* bright inner core (sharp) */}
          <circle r="5" fill="#ffffff">
            <animateMotion
              dur={`${duration}s`}
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath xlinkHref="#stairPath" />
            </animateMotion>
          </circle>

          {/* tiny sparkle/flair behind head */}
          <g className="flare" opacity="0.9">
            <ellipse rx="18" ry="6" fill="#9b5cf6" opacity="0.18">
              <animateMotion dur={`${duration}s`} repeatCount="indefinite" rotate="auto">
                <mpath xlinkHref="#stairPath" />
              </animateMotion>
            </ellipse>
          </g>
        </g>

        {/* optional: add little stars along the path to sell the effect */}
        <g id="stars">
          {/* a few static sparkles */}
          <circle cx="150" cy="40" r="1.4" fill="#fff" opacity="0.9" />
          <circle cx="260" cy="90" r="1.2" fill="#fff" opacity="0.9" />
          <circle cx="360" cy="30" r="1.3" fill="#fff" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
}
