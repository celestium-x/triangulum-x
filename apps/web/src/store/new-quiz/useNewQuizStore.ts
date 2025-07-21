import { QuizStatusEnum, QuizType, TemplateEnum } from "@/types/prisma-types";
import { create } from "zustand";

interface NewQuizStoreTypes {
    quiz: QuizType;
    updateQuiz: (quiz: QuizType) => void;
}

export const useNewQuizStore = create<NewQuizStoreTypes>((set, get) => ({
    quiz: {
        id: "",
        title: "",
        description: "",
        theme: TemplateEnum.CLASSIC,
        prizePool: 0,
        currency: "",
        basePointsPerQuestion: 0,
        pointsMultiplier: 0,
        timeBonus: false,
        eliminationThreshold: 0,
        questionTimeLimit: 0,
        breakBetweenQuestions: 0,
        status: QuizStatusEnum.CREATED,
        createdAt: new Date(),
        updatedAt: new Date(),
        scheduledAt: null,
        startedAt: null,
        endedAt: null,
    },
    updateQuiz: (data: Partial<QuizType>) => {
        const quiz = get().quiz;
        set({ quiz: { ...quiz, ...data } });
    }
    
}))