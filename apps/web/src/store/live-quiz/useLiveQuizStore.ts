import { GameSessionType, QuestionType, QuizType } from '@/types/prisma-types';
import { create } from 'zustand';

interface LiveQuizStore {
    quiz: QuizType | null;
    updateQuiz: (updatedFields: Partial<QuizType>) => void;

    gameSession: GameSessionType | null;
    updateGameSession: (updatedFields: Partial<GameSessionType>) => void;

    currentQuestion: QuestionType | null | undefined;
    updateCurrentQuestion: (updatedFields: Partial<QuestionType>) => void;

    alreadyResponded: boolean;
    setAlreadyResponded: (value: boolean) => void;
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
            if (
                updatedFields.questions &&
                updatedFields.questions.length > 0 &&
                !state.currentQuestion
            ) {
                // Find the first non-asked question
                const firstAvailableQuestion = updatedFields.questions
                    .filter((q) => q && !q.isAsked)
                    .sort((a, b) => (a?.orderIndex || 0) - (b?.orderIndex || 0))[0];

                currentQuestion = firstAvailableQuestion ?? updatedFields.questions[0];
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
        set((state) => {
            // If we're passing a complete question object, replace entirely
            if (updateFields.id && updateFields.question) {
                return {
                    currentQuestion: updateFields as QuestionType,
                };
            }

            // Otherwise, merge with existing
            return {
                currentQuestion: {
                    ...state.currentQuestion,
                    ...updateFields,
                } as QuestionType,
            };
        });
    },

    alreadyResponded: false,
    setAlreadyResponded: (value: boolean) => set({ alreadyResponded: value }),
}));
