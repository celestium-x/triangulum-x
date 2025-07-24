'use client'
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

export const useHandleClickOutside = (
    refs: RefObject<HTMLDivElement | null>[], 
    setOpen: Dispatch<SetStateAction<boolean>>
) => {
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            const isClickInside = refs.some(ref => 
                ref.current && ref.current.contains(e.target as Node)
            );
            
            if (!isClickInside) {
                setOpen(false);
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [refs, setOpen]);
};