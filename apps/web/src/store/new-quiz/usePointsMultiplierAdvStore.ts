import { create } from "zustand";

interface PointMultiplierAdvanced {
    enablePointMultiplier: boolean;
    setEnablePointMultiplier: (val: boolean) => void;
    enableLinearPointMultiplier: boolean;
    setEnableLinearPointMultiplier: (val: boolean) => void;
    enableSteppedPointMultiplier: boolean;
    setEnableSteppedPointMultiplier: (val: boolean) => void;
    inputPointMultiplier: string;
    setInputPointMultiplier: (val: string) => void;
}

export const usePointsMultiplierAdvStore = create<PointMultiplierAdvanced>((set) => ({
    enablePointMultiplier: false,
    setEnablePointMultiplier: (val) => set({ enablePointMultiplier: val }),
    enableLinearPointMultiplier: false,
    setEnableLinearPointMultiplier: (val) => set({ enableLinearPointMultiplier: val }),
    enableSteppedPointMultiplier: false,
    setEnableSteppedPointMultiplier: (val) => set({ enableSteppedPointMultiplier: val }),
    inputPointMultiplier: "1.2",
    setInputPointMultiplier: (val) => set({ inputPointMultiplier: val })
}))

