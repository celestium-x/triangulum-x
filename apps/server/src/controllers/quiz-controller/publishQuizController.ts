import prisma from '@repo/db/client';
import { Request, Response } from 'express';

export default async function publishQuizController(req: Request, res: Response) {
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

    if (quiz.status === 'PUBLISHED') {
        res.status(400).json({
            success: false,
            message: 'Quiz is already published',
        });
        return;
    }

    if (quiz.status === 'LIVE') {
        res.status(400).json({
            success: false,
            message: 'Quiz is live',
        });
        return;
    }

    try {
        await prisma.quiz.update({
            where: {
                id: quizId,
            },
            data: {
                status: 'PUBLISHED',
            },
        });

        res.status(200).json({
            success: true,
            message: 'Quiz published successfully',
        });
        return;
    } catch (err) {
        console.error('Error publishing quiz:', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}
