import { HostScreenEnum } from '@/types/prisma-types';
import { create } from 'zustand';

interface LiveQuizHostStoreProps {
    currentScreen: HostScreenEnum | null;
    setCurrentScreen: (currentScreen: HostScreenEnum) => void;
}

export const useLiveQuizHostStore = create<LiveQuizHostStoreProps>((set) => ({
    currentScreen: null,

    setCurrentScreen: (currentScreen: HostScreenEnum) => {
        set({ currentScreen });
    },
}));
