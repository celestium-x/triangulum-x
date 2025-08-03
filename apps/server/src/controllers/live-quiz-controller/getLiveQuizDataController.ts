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

        const { quizId, gameSessionId, role, userId } = decoded as CookiePayload;

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
                    host: {
                        select: {
                            name: true,
                            image: true,
                            email: true,
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
                    spectatorScreen: true,
                    totalParticipants: true,
                    activeParticipants: true,
                    currentQuestionIndex: true,
                    totalSpectators: true,
                    avgResponseTime: true,
                    correctAnswerRate: true,
                },
            });

            const participants = await tx.participant.findMany({
                where: {
                    quizId: quizId,
                },
                select: {
                    id: true,
                    nickname: true,
                    avatar: true,
                },
            });

            // Role-specific data
            let userData = null;

            switch (role) {
                case 'HOST':
                    userData = await tx.user.findUnique({
                        where: { id: userId },
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            image: true,
                            walletAddress: true,
                            isVerified: true,
                        },
                    });
                    break;

                case 'PARTICIPANT':
                    userData = await tx.participant.findFirst({
                        where: {
                            quizId: quizId,
                            id: userId,
                        },
                        select: {
                            id: true,
                            nickname: true,
                            avatar: true,
                            isEliminated: true,
                            eliminatedAt: true,
                            isNameChanged: true,
                            eliminatedAtQuestion: true,
                            finalRank: true,
                            totalScore: true,
                            correctAnswers: true,
                            longestStreak: true,
                            walletAddress: true,
                        },
                    });
                    break;

                case 'SPECTATOR':
                    userData = await tx.spectator.findFirst({
                        where: {
                            quizId: quizId,
                            id: userId,
                        },
                        select: {
                            id: true,
                            nickname: true,
                            avatar: true,
                            joinedAt: true,
                        },
                    });
                    break;
            }

            return { quiz, gameSession, userData, participants };
        });

        if (!result.quiz || !result.gameSession) {
            res.status(404).json({
                success: false,
                message: 'Quiz or Game session not found',
            });
            return;
        }

        if (!result.userData) {
            res.status(404).json({
                success: false,
                message: `${role} data not found`,
            });
            return;
        }

        const sanitizedGameSession = QuizAction.sanitizeGameSession(result.gameSession, role);
        res.status(200).json({
            success: true,
            quiz: result.quiz,
            gameSession: sanitizedGameSession,
            userData: result.userData,
            participants: result.participants,
            role,
        });
        return;
    } catch (err: any) {
        console.error('Unexpected error in getLiveQuizDataController:', err);
        unauthorized(res);
        return;
    }
}
