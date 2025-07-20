import {z} from "zod"

export const createQuizSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    prizePool: z.coerce.number().nonnegative(),
    currency: z.string().default("SOL"),
    basePointsPerQuestion: z.coerce.number().optional(),
    pointsMultiplier: z.coerce.number().optional(),
    timeBonus: z.coerce.boolean().optional(),
    eliminationThreshold: z.coerce.number().optional(),
    questionTimeLimit: z.coerce.number().optional(),
    breakBetweenQuestions: z.coerce.number().optional(),
    scheduledAt: z.coerce.date().optional(),
});

