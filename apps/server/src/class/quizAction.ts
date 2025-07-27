import prisma from '@repo/db/client';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

interface HostTokenPayload {
    userId: string;
    quizId: string;
    gameSessionId: string;
    role: 'HOST';
    tokenId: string;
    iat: number;
    exp: number;
}

export default class QuizAction {
    static generateCode(length: number = 8): string {
        return randomBytes(length).toString('hex').slice(0, length).toUpperCase();
    }
    static async deleteQuiz(quizId: string) {
        await prisma.quiz.delete({
            where: {
                id: quizId,
            },
        });
    }
    static async validOwner(hostId: number, quizId: string): Promise<boolean> {
        const quiz = await prisma.quiz.findUnique({
            where: {
                id: quizId,
                hostId: String(hostId),
            },
        });
        if (!quiz) {
            return false;
        }
        return true;
    }
    public static generateTokenId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    public static generateHostToken(userId: string, quizId: string, gameSessionId: string): string {
        const tokenId = QuizAction.generateTokenId();
        const payload: HostTokenPayload = {
            userId,
            quizId,
            gameSessionId,
            role: 'HOST',
            tokenId,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        };
        return jwt.sign(payload, JWT_SECRET!);
    }

    public static verifyHostToken(token: string): HostTokenPayload | null {
        try {
            return jwt.verify(token, JWT_SECRET!) as HostTokenPayload;
        } catch {
            return null;
        }
    }
}
