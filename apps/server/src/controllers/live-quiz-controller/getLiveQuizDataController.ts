import { Request, Response } from 'express';
import { parse } from 'cookie';
import prisma from '@repo/db/client';
import { CookiePayload } from '../../types/web-socket-types';
import QuizAction from '../../class/quizAction';

function unauthorized(res: Response) {
    return res.status(401).json({ success: false, message: 'Unauthorized user' });
}

export default async function getLiveQuizDataController(req: Request, res: Response) {
    const cookieHeader = req.headers.cookie;
    const cookies = cookieHeader ? parse(cookieHeader) : {};
    const token = cookies['token'];
    const { quizId: quizIdParams } = req.params;
    if (!token) {
        unauthorized(res);
        return;
    }

    try {
        const decoded = QuizAction.verifyCookie(token);
        if (typeof decoded !== 'object' || !decoded) return unauthorized(res);

        const { quizId, gameSessionId, role } = decoded as CookiePayload;
        if (!quizId || !gameSessionId || !role || !quizIdParams || quizIdParams !== quizId) {
            return unauthorized(res);
        }

        const result = await prisma.$transaction(async (tx) => {
            const quiz = await tx.quiz.findUnique({
                where: { id: quizId },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    theme: true,
                    status: true,
                    questionTimeLimit: true,
                    breakBetweenQuestions: true,
                    eliminationThreshold: true,
                    timeBonus: true,
                    liveChat: true,
                    spectatorMode: true,
                    basePointsPerQuestion: true,
                    pointsMultiplier: true,
                    prizePool: true,
                    currency: true,
                    _count: {
                        select: {
                            questions: true,
                            participants: true,
                        },
                    },
                },
            });

            const gameSession = await tx.gameSession.findUnique({
                where: { id: gameSessionId },
                select: {
                    id: true,
                    status: true,
                    hostScreen: true,
                    participantScreen: true,
                    totalParticipants: true,
                    activeParticipants: true,
                    currentQuestionIndex: true,
                },
            });

            return { quiz, gameSession };
        });

        if (!result.quiz || !result.gameSession) {
            res.status(404).json({
                success: false,
                message: 'Quiz or Game session not found',
            });
            return;
        }

        res.status(200).json({
            success: true,
            quiz: result.quiz,
            gameSession: QuizAction.sanitizeGameSession(result.gameSession, role),
            role,
        });
        return;
    } catch (err: any) {
        console.error('Unexpected error in getLiveQuizDataController:', err);
        unauthorized(res);
        return;
    }
}
