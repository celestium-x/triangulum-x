import { HostScreenEnum } from '@/types/prisma-types';
import { create } from 'zustand';

interface LiveQuizHostStoreProps {
    currentScreen: HostScreenEnum | null;
    setCurrentScreen: (currentScreen: HostScreenEnum) => void;

    liveOptions: number[];
    updateLiveOptions: (option: number) => void;
}

export const useLiveQuizHostStore = create<LiveQuizHostStoreProps>((set) => ({
    currentScreen: null,
    setCurrentScreen: (currentScreen: HostScreenEnum) => {
        set({ currentScreen });
    },

    liveOptions: [],
    updateLiveOptions: (option: number) => {
        set((state) => {
            const liveOptions = [...state.liveOptions];
            liveOptions[option] = (liveOptions[option] ?? 0) + 1;
            return { liveOptions: liveOptions };
        })
    }
}));
