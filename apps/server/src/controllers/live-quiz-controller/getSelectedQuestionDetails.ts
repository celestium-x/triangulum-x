import prisma from '@repo/db/client';
import { Request, Response } from 'express';

export default async function getSelectedQuestionDetails(req: Request, res: Response) {
    const { quizId: questionId } = req.params;

    try {
        const question = await prisma.question.findUnique({
            where: {
                id: questionId,
            },
            select: {
                id: true,
                question: true,
                options: true,
                explanation: true,
                difficulty: true,
                imageUrl: true,
            },
        });

        if (!question) {
            res.status(404).json({ success: false, message: 'Question not found' });
            return;
        }

        res.status(201).json({ success: true, question });
        return;
    } catch (error) {
        console.error('Unexpected error in getSelectedQuestionDetails: ', error);
        res.status(500).json({ success: false, message: 'Failed to fetch question data' });
        return;
    }
}
