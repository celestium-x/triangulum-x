"use client"

import { useAutoSaveStore } from "@/store/home/useAutoSaveStore";
import { DraftRenderer, useDraftRendererStore } from "@/store/new-quiz/useDraftRendererStore"
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function AutoSaveComponent() {
    const { setState } = useDraftRendererStore();
    const { enabledAutoSave } = useAutoSaveStore();
    const underlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const underline = underlineRef.current;
        if (!underline) return;

        gsap.set(underline, {
            scaleX: 0,
            transformOrigin: "center"
        });

        const handleMouseEnter = () => {
            gsap.to(underline, {
                scaleX: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(underline, {
                scaleX: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const parentElement = underline.parentElement;
        if (parentElement) {
            parentElement.addEventListener('mouseenter', handleMouseEnter);
            parentElement.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                parentElement.removeEventListener('mouseenter', handleMouseEnter);
                parentElement.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, []);

    return (
        <div
            onClick={() => setState(DraftRenderer.ADVANCED)}
            className="flex items-center gap-x-2">
            <div className={`h-2 w-2 rounded-full animate-pulse ${enabledAutoSave ? " bg-green-600" : "bg-red-500"}`}></div>
            <span className="text-neutral-500 dark:text-neutral-400 text-xs cursor-pointer relative">
                {enabledAutoSave ? "auto save is on" : "auto save is off"}
                <div
                    ref={underlineRef}
                    className="absolute bottom-0 left-0 w-full h-px bg-current"
                />
            </span>
        </div>
    )
}