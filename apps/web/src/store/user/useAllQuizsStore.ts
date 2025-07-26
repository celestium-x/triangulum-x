import { QuizType } from "@/types/prisma-types";
import { create } from "zustand";

interface AllQuizsStoreType {
    quizs: QuizType[];
    setAllQuizs: (quizs: QuizType[]) => void;
}

export const useAllQuizsStore = create<AllQuizsStoreType>((set) => ({
    quizs: [],
    setAllQuizs: (quizs) => set({ quizs }),
}));
