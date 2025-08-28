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
        const quiz = await prisma.quiz.findUnique({
            where: {
                id: quizId,
            },
            select: {
                questions: {
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
                        isAsked: true,
                    },
                },
            },
        });

        if (!quiz) {
            res.status(404).json({
                success: false,
                message: 'Quiz not found',
                value: 'QUIZ_NOT_FOUND',
            });
            return;
        }

        const questionWithTargetedIndex = quiz.questions.find(
            (q) => q.orderIndex === targetOrderIndex,
        );

        if (!questionWithTargetedIndex) {
            res.status(404).json({
                success: false,
                message: `Question not found at index ${targetOrderIndex}`,
                value: 'QUESTION_NOT_FOUND',
            });
            return;
        }

        const currentQuestionValue: {
            isAsked: boolean;
            orderIndex: number;
        } = {
            isAsked: questionWithTargetedIndex.isAsked,
            orderIndex: questionWithTargetedIndex.orderIndex,
        };

        // check it once for infinite loop
        while (currentQuestionValue.isAsked) {
            if (currentQuestionValue.orderIndex >= quiz.questions.length && quiz.questions[0]) {
                currentQuestionValue.orderIndex = 0;
                currentQuestionValue.isAsked = quiz.questions[0].isAsked;
                continue;
            }

            if (currentQuestionValue.orderIndex < quiz.questions.length) {
                const nextQuestion = quiz.questions[currentQuestionValue.orderIndex];
                currentQuestionValue.isAsked = nextQuestion ? nextQuestion.isAsked : false;
                currentQuestionValue.orderIndex++;
            }
        }

        res.status(200).json({
            success: true,
            question: quiz.questions.find((q) => q.orderIndex === currentQuestionValue.orderIndex),
        });
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
