import { QuestionType, QuizStatusEnum, QuizType, TemplateEnum } from "@/types/prisma-types";
import { create } from "zustand";

interface NewQuizStoreTypes {
    quiz: QuizType;
    updateQuiz: (quiz: Partial<QuizType>) => void;
    addQuestion: () => void;
    editQuestion: (questionIndex: number, question: Partial<QuestionType>) => void;
    currentQuestionIndex: number;
    setCurrentQuestionIndex: (index: number) => void;
    removeQuestion: (index: number) => void;
    updateQuestionPoints: (points: number[]) => void;
    changeQuestionPoint: (questionIndex: number, point: number) => void;
    getQuestion: (questionIndex: number) => QuestionType | null;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export const useNewQuizStore = create<NewQuizStoreTypes>((set, get) => ({
    quiz: {
        id: "",
        title: "",
        description: "",
        theme: TemplateEnum.CLASSIC,
        prizePool: 0,
        currency: "",
        basePointsPerQuestion: 100,
        pointsMultiplier: 1,
        timeBonus: false,
        eliminationThreshold: 0,
        questionTimeLimit: 0,
        breakBetweenQuestions: 0,
        status: QuizStatusEnum.CREATED,
        createdAt: new Date(),
        updatedAt: new Date(),
        autoSave: true,
        liveChat: false,
        spectatorMode: false,
        scheduledAt: null,
        startedAt: null,
        endedAt: null,
        questions: Array.from({ length: 10 }, (_, index) => ({
            id: "",
            question: "What is the largest planet in our solar system?",
            options: ['Mercury', 'Venus', 'Earth', 'Jupiter'],
            correctAnswer: 3,
            explanation: "Jupiter is the largest planet in our solar system.",
            difficulty: 1,
            basePoints: 100,
            timeLimit: 30,
            orderIndex: index,
            imageUrl: "",
            quizId: ""
        }))
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
            options: ['Oxygen', 'Gold', 'Hydrogen', 'Silver'],
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

    editQuestion: (questionIndex: number, question: Partial<QuestionType>) => {
        const quiz = get().quiz;
        set({
            quiz: {
                ...quiz,
                questions: quiz.questions.map((q, index) =>
                    index === questionIndex ? { ...q, ...question } : q
                )
            }
        });
    },

    removeQuestion: (index: number) => {
        const quiz = get().quiz;
        const updatedQuestions = quiz.questions
            .filter((_, i) => i !== index)
            .map((q, i) => ({ ...q, orderIndex: i }));

        set({
            quiz: { ...quiz, questions: updatedQuestions },
            currentQuestionIndex: Math.min(get().currentQuestionIndex, updatedQuestions.length - 1)
        });
    },

    updateQuestionPoints: (points: number[]) => {
        const quiz = get().quiz;
        const newQuestions: QuestionType[] = quiz.questions.map((qs: QuestionType, index: number) => {
            return {
                ...qs,
                basePoints: points[index]!
            }
        });
        set({
            quiz: {
                ...quiz,
                questions: newQuestions
            },
        })
    },

    changeQuestionPoint: (questionIndex: number, point: number) => {
        get().editQuestion(questionIndex, { basePoints: point })
    },

    getQuestion(questionIndex: number) {

        if (questionIndex < 0) return null;

        const quiz = get().quiz;
        const question: QuestionType = quiz.questions.find((_, index) => index === questionIndex)!
        return question;
    },
    loading: false,
    setLoading: (loading: boolean) => set({ loading })
}));