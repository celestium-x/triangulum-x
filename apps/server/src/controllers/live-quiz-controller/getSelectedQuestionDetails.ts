import prisma from '@repo/db/client';
import { Request, Response } from 'express';

export default async function getSelectedQuestionDetails(req: Request, res: Response) {
    const { quizId, questionIndex } = req.params;

    if (!quizId || !questionIndex) {
        res.status(400).json({
            success: false,
            message: 'Invalid request',
            value: 'INVALID_REQUEST',
        });
        return;
    }
    const takeQuestionOfIndex = Number(questionIndex) + 1;
    try {
        const question = await prisma.question.findFirst({
            where: {
                quizId: quizId,
                orderIndex: takeQuestionOfIndex,
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
            res.status(404).json({ success: false, message: 'Question not found' });
            return;
        }

        res.status(200).json({ success: true, question }); // Changed from 201 to 200
        return;
    } catch (error) {
        console.error('Unexpected error in getSelectedQuestionDetails: ', error);
        res.status(500).json({ success: false, message: 'Failed to fetch question data' });
        return;
    }
}
