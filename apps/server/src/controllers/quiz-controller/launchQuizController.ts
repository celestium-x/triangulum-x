import prisma from '@repo/db/client';
import { Request, Response } from 'express';
import QuizAction from '../../class/quizAction';
import { USER_TYPE } from '../../types/web-socket-types';

export default async function launchQuizController(req: Request, res: Response) {
    const userId = req.user?.id;
    const quizId = req.params.quizId;

    if (!userId) {
        res.status(401).json({
            success: false,
            message: 'User authentication required',
        });
        return;
    }
    if (!quizId) {
        res.status(400).json({
            success: false,
            message: 'Quiz ID is required',
        });
        return;
    }

    try {
        const quiz = await prisma.quiz.findUnique({
            where: {
                id: quizId,
            },
        });

        if (!quiz) {
            res.status(404).json({
                success: false,
                message: 'Quiz not found',
            });
            return;
        }

        if (quiz.status === 'LIVE') {
            res.status(400).json({
                success: false,
                message: 'Quiz is already live',
            });
            return;
        }

        if (quiz.status !== 'PUBLISHED') {
            res.status(400).json({
                success: false,
                message: 'Quiz is not published',
            });
            return;
        }

        const result = await prisma.$transaction(async (tx) => {
            const participantCode = await QuizAction.generateUniqueCode('participant');
            const spectatorCode = await QuizAction.generateUniqueCode('spectator');

            const updatedQuiz = await tx.quiz.update({
                where: {
                    id: quizId,
                },
                data: {
                    status: 'LIVE',
                    startedAt: new Date(),
                    participantCode,
                    spectatorCode,
                },
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

            const gameSession = await tx.gameSession.create({
                data: {
                    quizId: quizId,
                    hostScreen: 'LOBBY',
                    participantScreen: 'LOBBY',
                    questionStartedAt: new Date(),
                    status: 'WAITING',
                },
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
            return { updatedQuiz, gameSession };
        });

        const secureTokenData = QuizAction.generateUserToken(
            String(userId),
            quizId,
            result.gameSession.id,
            USER_TYPE.HOST,
        );

        res.cookie('token', secureTokenData, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 1000,
        });

        res.status(200).json({
            success: true,
            message: 'Quiz launched successfully',
            data: {
                quiz: result.updatedQuiz,
                gameSession: result.gameSession,
            },
        });
        return;
    } catch (err) {
        console.error('Error launching quiz:', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}
