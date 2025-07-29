import { Request, Response } from 'express';
import prisma from '@repo/db/client';
import GenerateUser from '../../class/generateUser';
import QuizAction from '../../class/quizAction';
import { participantJoinSchema } from '../../schemas/participantJoinSchema';

const ALLOWED_STATUSES = ['CREATED', 'SCHEDULED'];

export default async function participantJoinController(req: Request, res: Response) {
    const parseResult = participantJoinSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({
            success: false,
            message: parseResult.error,
        });
    }

    const { code } = parseResult.data;

    try {
        const quiz = await prisma.quiz.findUnique({
            where: { participantCode: code },
        });

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: 'Invalid quiz code. Please check and try again.',
            });
        }

        if (!ALLOWED_STATUSES.includes(quiz.status)) {
            return res.status(403).json({
                success: false,
                message: 'This quiz is not accepting new participants at the moment.',
            });
        }

        const gameSession = await prisma.gameSession.findUnique({
            where: { quizId: quiz.id },
        });

        if (!gameSession) {
            return res.status(500).json({
                success: false,
                message: 'Unable to join. The game session has not been initialized yet.',
            });
        }

        const participant = await prisma.participant.create({
            data: {
                quizId: quiz.id,
                nickname: GenerateUser.getRandomName(),
                avatar: GenerateUser.getRandomAvatar(),
                ipAddress: req.ip,
            },
        });

        const secureTokenData = QuizAction.generateParticipantToken(
            participant.id,
            quiz.id,
            gameSession.id,
        );

        try {
            res.cookie('participant-token', secureTokenData, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 1000,
            });
        } catch (cookieErr) {
            console.error('Cookie setting error', cookieErr);
            res.status(500).json({
                success: false,
                message: 'Could not set authentication cookie. Please try again.',
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'You have successfully joined the quiz!',
            data: {
                quizId: quiz.id,
                gameSessionId: gameSession.id,
                participantId: participant.id,
                participant: {
                    nickname: participant.nickname,
                    avatar: participant.avatar,
                },
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
