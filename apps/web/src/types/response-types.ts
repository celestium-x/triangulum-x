import { QuizType } from "./prisma-types";

export interface CreateQuizRequestBody {
    success: boolean,
    message: string,
    quiz?: QuizType,
}

