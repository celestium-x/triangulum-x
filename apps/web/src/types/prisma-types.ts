

export interface UserType {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    walletAddress?: string | null;

    isVerified: boolean;
    isActive: boolean;

    createdAt: Date;
    updatedAt: Date;
    lastLoginAt: Date;

    Quiz: QuizType[];
}

export interface QuizType {
    id: string;
    title: string;
    description?: string | null;
    theme: TemplateEnum;
    participantCode?: string;
    spectatorCode?: string;

    prizePool: number;
    currency: string;

    basePointsPerQuestion: number;
    pointsMultiplier: number;
    timeBonus: boolean;

    eliminationThreshold: number;

    questionTimeLimit: number;
    breakBetweenQuestions: number;
    status: QuizStatusEnum;

    createdAt: Date;
    updatedAt: Date;
    scheduledAt?: Date | null;
    startedAt?: Date | null;
    endedAt?: Date | null;

    hostId?: string;
    host?: UserType;
    questions: QuestionType[];
}

export interface QuestionType {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
    difficulty: number;
    basePoints: number;
    timeLimit: number;
    orderIndex: number;
    imageUrl?: string;
    quizId: string;
    quiz?: QuizType;
}


export enum TemplateEnum {
    CLASSIC = 'CLASSIC',
    MODERN = 'MODERN',
    PASTEL = 'PASTEL',
    NEON = 'NEON',
    YELLOW = 'YELLOW',
    GREEN = 'GREEN',
    BLUE = 'BLUE',
}

export enum QuizStatusEnum {
    CREATED = "CREATED",
    SCHEDULED = "SCHEDULED",
    LIVE = "LIVE",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
    PAYOUT_PENDING = "PAYOUT_PENDING",
    PAYOUT_COMPLETED = "PAYOUT_COMPLETED",
}