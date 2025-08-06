import { GameSessionType, QuestionType, QuizType } from '@/types/prisma-types';
import { create } from 'zustand';

interface LiveQuizStore {
    quiz: QuizType | null;
    updateQuiz: (updatedFields: Partial<QuizType>) => void;
    gameSession: GameSessionType | null;
    updateGameSession: (updatedFields: Partial<GameSessionType>) => void;
    currentQuestion: QuestionType | null;
    updateCurrentQuestion: (updatedFields: Partial<QuestionType>) => void;
}

export const useLiveQuizStore = create<LiveQuizStore>((set) => ({
    quiz: null,
    updateQuiz: (updatedFields: Partial<QuizType>) => {
        set((state) => {
            const updatedQuiz = {
                ...state.quiz,
                ...updatedFields,
            } as QuizType;

            let currentQuestion = state.currentQuestion;
            if (updatedFields.questions && updatedFields.questions.length > 0) {
                currentQuestion = updatedFields.questions?.[0] ?? null;
            }
            return {
                quiz: updatedQuiz,
                currentQuestion,
            };
        });
    },
    gameSession: null,
    updateGameSession: (updatedFields: Partial<GameSessionType>) => {
        set((state) => ({
            gameSession: {
                ...state.gameSession,
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
    },
}));
