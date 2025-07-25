import prisma from "@repo/db/client";
import { Request, Response } from "express";
import QuizAction from "../../class/quizAction";
import { createQuizSchema } from "../../schemas/createQuizSchema";

export default async function upsertQuizController(req: Request, res: Response) {
    const { quizId } = req.params
    if (!quizId) {
        res.status(400).json({
            success: false,
            message: "Invalid quizId",
            value: "INVALID_QUIZID"
        });
        return;
    }

    const parsed = createQuizSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({
            success: false,
            message: "Error while creating quiz",
            value: "INVALID_QUIZ_FORMAT"
        });
        return;
    }

    const input = parsed.data;
    const hostId = req.user?.id;
    const questions = input.questions;

    if (!hostId) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
            value: "UNAUTHORIZED"
        });
        return;
    }

    try {
        let quiz = await prisma.quiz.findUnique({
            where: {
                id: quizId
            }
        })

        if (!quiz) {

            quiz = await prisma.quiz.create({
                data: {
                    ...input,
                    scheduledAt: input.scheduledAt ? new Date(input.scheduledAt) : undefined,
                    hostId: String(hostId),
                    questions: {
                        create: questions
                    }
                },
            });

        } else {
            const isValidOwner = await QuizAction.validOwner(hostId, quizId);
            if (isValidOwner) {

                quiz = await prisma.$transaction(async (tx) => {
                    await tx.question.deleteMany({
                        where: {
                            quizId
                        }
                    });

                    return await tx.quiz.update({
                        where: {
                            id: quizId
                        },
                        data: {
                            title: input.title,
                            description: input.description,
                            prizePool: input.prizePool,
                            currency: input.currency,
                            basePointsPerQuestion: input.basePointsPerQuestion,
                            pointsMultiplier: input.pointsMultiplier,
                            timeBonus: input.timeBonus,
                            eliminationThreshold: input.eliminationThreshold,
                            questionTimeLimit: input.questionTimeLimit,
                            breakBetweenQuestions: input.breakBetweenQuestions,
                            scheduledAt: input.scheduledAt ? new Date(input.scheduledAt) : undefined,
                            autoSave: input.autoSave,
                            liveChat: input.liveChat,
                            spectatorMode: input.spectatorMode,
                            questions: {
                                create: questions
                            }
                        }
                    })
                });
            }
        }
        res.status(201).json({
            success: true,
            quiz,
            message: "Quiz created successfully",
            value: "QUIZ_CREATED"
        });
        return;
    } catch (err) {
        console.error("[CREATE_QUIZ_ERROR]", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            value: "INTERNAL_SERVER_ERROR"
        });
        return;
    }
}

