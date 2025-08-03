import { GameSessionType, QuestionType, QuizType } from '@/types/prisma-types';
import { create } from 'zustand';

interface LiveQuizStore {
    quiz: QuizType | null;
    updateQuiz: (updatedFields: Partial<QuizType>) => void;
    gameSession: GameSessionType | null;
    updateGameSession: (updatedFields: Partial<GameSessionType>) => void;
    currentQuestion: QuestionType | null
    updateCurrentQuestion: (updatedFields: Partial<QuestionType>) => void;
}

export const useLiveQuizStore = create<LiveQuizStore>((set) => ({
    quiz: null,
    updateQuiz: (updatedFields: Partial<QuizType>) => {
        set((state) => ({
            quiz: {
                ...state.quiz,
                ...updatedFields,
            } as QuizType,
        }));
    },
    gameSession: null,
    updateGameSession: (updatedFields: Partial<GameSessionType>) => {
        set((state) => ({
            gameSession: {
                ...state.quiz,
                ...updatedFields,
            } as GameSessionType,
        }));
    },
    currentQuestion: null,
    updateCurrentQuestion: (updateFields: Partial<QuestionType>) => {
        set((state) => ({
            currentQuestion: {
                ...state.currentQuestion,
                ...updateFields,
            } as QuestionType,
        }));
    }
}));
