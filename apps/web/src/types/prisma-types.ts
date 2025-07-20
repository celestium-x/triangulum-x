export enum TypesQuizStatus {
    CREATED = "CREATED",
    SCHEDULED = "SCHEDULED",
    LIVE = "LIVE",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
    PAYOUT_PENDING = "PAYOUT_PENDING",
    PAYOUT_COMPLETED = "PAYOUT_COMPLETED",
}

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

    participantCode: string;
    spectatorCode: string;

    prizePool: number;
    currency: string;

    basePointsPerQuestion: number;
    pointsMultiplier: number;
    timeBonus: boolean;

    eliminationThreshold: number;

    questionTimeLimit: number;
    breakBetweenQuestions: number;
    status: TypesQuizStatus;

    createdAt: Date;
    updatedAt: Date;
    scheduledAt?: Date | null;
    startedAt?: Date | null;
    endedAt?: Date | null;

    hostId: string;
    host: UserType;
}
