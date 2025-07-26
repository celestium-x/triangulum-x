import { HomeRendererEnum } from '@/types/homeRendererTypes';
import { create } from 'zustand';

interface HomeRendererStoreTypes {
    value: HomeRendererEnum;
    setValue: (data: HomeRendererEnum) => void;
}

export const useHomeRendererStore = create<HomeRendererStoreTypes>((set) => ({
    value: HomeRendererEnum.DASHBOARD,
    setValue: (data: HomeRendererEnum) => set({ value: data }),
}));
