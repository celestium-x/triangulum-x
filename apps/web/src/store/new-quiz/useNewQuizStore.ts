import { QuestionType, QuizStatusEnum, QuizType, TemplateEnum } from "@/types/prisma-types";
import { create } from "zustand";

interface NewQuizStoreTypes {
    quiz: QuizType;
    updateQuiz: (quiz: QuizType) => void;
    addQuestion: () => void;
    editQuestion: (currentQuestionIndex: number) => void;
    currentQuestionIndex: number;
    setCurrentQuestionIndex: (index: number) => void;
    removeQuestion: (index: number) => void;
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
        questions: [
            {
                id: "",
                question: "What is the largest planet in our solar system?",
                options: "Mercury Venus Earth Jupiter",
                correctAnswer: 3,
                explanation: "Jupiter is the largest planet in our solar system.",
                difficulty: 1,
                basePoints: 100,
                timeLimit: 30,
                orderIndex: 0,
                imageUrl: "",
                quizId: ""
            },
            {
                id: "",
                question: "Who wrote the play 'Romeo and Juliet'?",
                options: "Charles Dickens William Shakespeare Mark Twain Jane Austen",
                correctAnswer: 1,
                explanation: "William Shakespeare wrote the tragedy 'Romeo and Juliet'.",
                difficulty: 1,
                basePoints: 100,
                timeLimit: 30,
                orderIndex: 1,
                imageUrl: "",
                quizId: ""
            }
        ]
    },

    currentQuestionIndex: 0,
    setCurrentQuestionIndex: (index: number) => set({ currentQuestionIndex: index }),

    updateQuiz: (data: Partial<QuizType>) => {
        const quiz = get().quiz;
        set({ quiz: { ...quiz, ...data } });
    },

    addQuestion: () => {
        const question: QuestionType = {
            id: "",
            question: "Which element has the chemical symbol 'O'?",
            options: "Oxygen Gold Hydrogen Silver",
            correctAnswer: 0,
            explanation: "Oxygen is represented by the symbol 'O' in the periodic table.",
            difficulty: 1,
            basePoints: 100,
            timeLimit: 30,
            orderIndex: get().quiz.questions.length,
            imageUrl: "",
            quizId: ""
        };
        const quiz = get().quiz;
        set({ quiz: { ...quiz, questions: [...quiz.questions, question] } });
    },

    editQuestion: (currentQuestionIndex) => {
        
    },

    removeQuestion: (index: number) => {
        const quiz = get().quiz;
        set({ quiz: { ...quiz, questions: quiz.questions.filter((_, i) => i !== index) } });
    }

}));
