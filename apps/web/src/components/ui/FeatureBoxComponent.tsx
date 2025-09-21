'use client';

import { Button } from '../ui/button';
import React, { useState } from 'react';

interface FeatureBoxComponentProps {
    title: string;
    description: string;
    buttonText: string;
    buttonIcon: React.ReactNode;
    backgroundSvg: (hovered: boolean) => React.ReactNode;
    buttonOnClick?: () => void;
}

export default function FeatureBoxComponent({
    title,
    description,
    buttonText,
    buttonIcon,
    backgroundSvg,
    buttonOnClick,
}: FeatureBoxComponentProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className={`
          relative h-[550px] w-[440px] 
          border-l border-r 
          transition-all
          group py-6 hover:bg-gradient-to-b dark:from-[#121212] from-neutral-200 via-transparent to-transparent 
          flex flex-col
        `}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="absolute top-0 left-0 w-full border-t opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 w-full border-b opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <span className="absolute -top-1 -left-1 w-2 h-2 bg-black dark:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-black dark:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-black dark:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-black dark:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="h-[10%] flex justify-start items-center text-[19px] px-7 mt-4">
                {title}
            </div>

            <div className="h-[20%] text-start text-[#7D8187] group-hover:text-dark-base group-hover:dark:text-light-base px-7">
                {description}
            </div>

            <div className="h-[70%] w-full flex justify-center items-center text-9xl">
                {backgroundSvg(hovered)}
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <Button
                    onClick={buttonOnClick}
                    className="dark:bg-transparent border border-neutral-700 flex bg-neutral-500 text-light-base dark:text-light-base rounded-full !px-4 !py-2.5 group-hover:dark:bg-neutral-900 text-md"
                >
                    {buttonText}
                    {buttonIcon}
                </Button>
            </div>
        </div>
    );
}
