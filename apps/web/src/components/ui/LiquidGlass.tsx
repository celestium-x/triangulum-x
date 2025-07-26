import React from 'react';

interface LiquidGlass {
    children: React.ReactNode;
}

// Utility function to convert px to rem
const pxToRem = (px: number) => `${px / 16}rem`;

export default function LiquidGlass({ children }: LiquidGlass) {
    // Fixed dimensions for the static div
    const glassWidth = pxToRem(270);
    const glassHeight = pxToRem(270);
    const glassPadding = pxToRem(30);
    const borderRadius = pxToRem(32);

    return (
        <div className="">
            <div
                className="relative flex items-center justify-center"
                style={{
                    width: glassWidth,
                    height: glassHeight,
                    padding: glassPadding,
                    borderRadius: borderRadius,
                }}
            >
                <div
                    className="absolute inset-0 z-0 backdrop-blur-[3px] rounded-[inherit] "
                    style={{ filter: 'url(#glass-blur)' }}
                ></div>
                <div className=" absolute inset-0 z-10 rounded-[inherit] shadow-[0_4px_4px_rgba(0,0,0,0.15),0_0_12px_rgba(0,0,0,0.08)]"></div>
                <div className=" absolute inset-0 z-20 rounded-[inherit] shadow-[inset_3px_3px_3px_0_rgba(255,255,255,0.45),inset_-3px_-3px_3px_0_rgba(255,255,255,0.45)]"></div>

                <p className="text-white text-lg text-center z-30">{children}</p>
            </div>

            <svg style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg">
                <filter
                    id="glass-blur"
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    filterUnits="objectBoundingBox"
                >
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.003 0.007"
                        numOctaves="1"
                        result="turbulence"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="turbulence"
                        scale="200"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>
            </svg>
        </div>
    );
}
