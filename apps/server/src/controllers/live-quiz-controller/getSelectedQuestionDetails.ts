import prisma from '@repo/db/client';
import { Request, Response } from 'express';

export default async function getSelectedQuestionDetails(req: Request, res: Response) {
    const { quizId, questionIndex } = req.params;

    if (!quizId || questionIndex === undefined || questionIndex === null) {
        res.status(400).json({
            success: false,
            message: 'Invalid request - quizId and questionIndex are required',
            value: 'INVALID_REQUEST',
        });
        return;
    }

    const targetOrderIndex = Number(questionIndex);

    if (isNaN(targetOrderIndex) || targetOrderIndex < 0) {
        res.status(400).json({
            success: false,
            message: 'Invalid questionIndex - must be a non-negative number',
            value: 'INVALID_QUESTION_INDEX',
        });
        return;
    }

    try {
        const question = await prisma.question.findFirst({
            where: {
                quizId: quizId,
                orderIndex: targetOrderIndex,
            },
            select: {
                id: true,
                question: true,
                options: true,
                explanation: true,
                difficulty: true,
                basePoints: true,
                timeLimit: true,
                orderIndex: true,
                imageUrl: true,
            },
        });

        if (!question) {
            res.status(404).json({
                success: false,
                message: `Question not found at index ${targetOrderIndex}`,
                value: 'QUESTION_NOT_FOUND',
            });
            return;
        }

        res.status(200).json({ success: true, question });
        return;
    } catch (error) {
        console.error('Unexpected error in getSelectedQuestionDetails: ', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch question data',
            value: 'INTERNAL_SERVER_ERROR',
        });
        return;
    }
}
