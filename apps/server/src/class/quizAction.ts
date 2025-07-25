import prisma from "@repo/db/client";
import { randomBytes } from "crypto"

export default class QuizAction {

    static generateCode(length: number = 8): string {
        return randomBytes(length).toString("hex").slice(0, length).toUpperCase();
    }
    static deleteQuiz(quizId: string) {
        prisma.quiz.delete({
            where: {
                id: quizId
            }
        })
    }
    static async validOwner(hostId: number, quizId: string): Promise<boolean> {
        const quiz = await prisma.quiz.findUnique({
            where: {
                id: quizId,
                hostId: String(hostId)
            }
        })
        if (!quiz) {
            return false;;
        }
        return true;
    }

}

