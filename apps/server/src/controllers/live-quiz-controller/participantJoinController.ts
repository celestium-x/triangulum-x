import { Request, Response } from 'express';
import prisma from '@repo/db/client';
import GenerateUser from '../../class/generateUser';
import QuizAction from '../../class/quizAction';
import { participantJoinSchema } from '../../schemas/participantJoinSchema';

export default async function participantJoinController(req: Request, res: Response) {
    const parseResult = participantJoinSchema.safeParse(req.body);
    if (!parseResult.success) {
        res.status(400).json({
            success: false,
            message: 'Invalid request data',
        });
        return;
    }

    const { code } = parseResult.data;

    try {
        const quiz = await prisma.quiz.findUnique({
            where: { participantCode: code },
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

        if (!quiz) {
            res.status(404).json({
                success: false,
                message: 'Invalid quiz code. Please check and try again.',
            });
            return;
        }

        if (!['LIVE'].includes(quiz.status)) {
            res.status(403).json({
                success: false,
                message: 'Quiz is not available for joining at this time.',
            });
            return;
        }

        const gameSession = await prisma.gameSession.findUnique({
            where: { quizId: quiz.id },
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

        if (!gameSession) {
            res.status(500).json({
                success: false,
                message: 'Quiz session is not available yet. Please try again later.',
            });
            return;
        }

        if (!['WAITING', 'STARTING'].includes(gameSession.status)) {
            res.status(403).json({
                success: false,
                message: 'Quiz has already started. New participants cannot join.',
            });
            return;
        }

        const result = await prisma.$transaction(async (tx) => {
            const participant = await tx.participant.create({
                data: {
                    quizId: quiz.id,
                    nickname: GenerateUser.getRandomName(),
                    avatar: GenerateUser.getRandomAvatar(),
                    ipAddress: req.ip || 'unknown',
                },
            });

            const updatedGameSession = await tx.gameSession.update({
                where: { id: gameSession.id },
                data: {
                    totalParticipants: {
                        increment: 1,
                    },
                    activeParticipants: {
                        increment: 1,
                    },
                },
                select: {
                    id: true,
                    status: true,
                    hostScreen: true,
                    participantScreen: true,
                    currentQuestionIndex: true,
                    totalParticipants: true,
                    activeParticipants: true,
                },
            });

            return { participant, updatedGameSession };
        });

        const secureTokenData = QuizAction.generateParticipantToken(
            result.participant.id,
            quiz.id,
            gameSession.id,
        );

        try {
            res.cookie('participant-token', secureTokenData, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000,
            });
        } catch (cookieErr) {
            console.error('Cookie setting error:', cookieErr);
            await prisma
                .$transaction(async (tx) => {
                    await tx.participant.delete({
                        where: { id: result.participant.id },
                    });
                    await tx.gameSession.update({
                        where: { id: gameSession.id },
                        data: {
                            totalParticipants: { decrement: 1 },
                            activeParticipants: { decrement: 1 },
                        },
                    });
                })
                .catch((cleanupErr) => {
                    console.error('Failed to cleanup after cookie error:', cleanupErr);
                });

            res.status(500).json({
                success: false,
                message: 'Could not set authentication cookie. Please try again.',
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Successfully joined the quiz!',
            data: {
                participant: result.participant,
                quiz: quiz,
                gameSession: result.updatedGameSession,
            },
        });
        return;
    } catch (err) {
        console.error('Error during participant join:', err);
        res.status(500).json({
            success: false,
            message: 'Something went wrong while trying to join the quiz. Please try again.',
        });
        return;
    }
}
