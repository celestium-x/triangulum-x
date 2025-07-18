'use client'

import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

export const useHandleClickOutside = (ref: RefObject<HTMLDivElement | null>, setOpen: Dispatch<SetStateAction<boolean>>) => {
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref, setOpen])
}