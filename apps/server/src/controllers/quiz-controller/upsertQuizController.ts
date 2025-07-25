import prisma from "@repo/db/client";
import { Request, Response } from "express";
import QuizAction from "../../class/quizAction";
import { createQuizSchema } from "../../schemas/createQuizSchema";

export default async function upsertQuizController(req: Request, res: Response) {
    const { quizId } = req.params
    if (!quizId) {
        res.status(400).json({ success: false, message: "Invalid quizId" });
        return;
    }

    const parsed = createQuizSchema.safeParse(req.body);
    console.log("req.body is : ", req.body);
    if (!parsed.success) {
        res.status(400).json({ success: false, message: "Error while creating quiz" });
        return;
    }

    const input = parsed.data;
    const hostId = req.user?.id;

    if (!hostId) {
        res.status(401).json({ success: false, message: "Unauthorized" });
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
                    participantCode: QuizAction.generateCode(8),
                    spectatorCode: QuizAction.generateCode(8),
                    scheduledAt: input.scheduledAt ? new Date(input.scheduledAt) : undefined,
                    hostId: String(hostId)
                },
            });
        } else {
            const isValidOwner = await QuizAction.validOwner(hostId, quizId);
            console.log("isValidOwner is : ", isValidOwner);
            if (isValidOwner) {
                quiz = await prisma.quiz.update({
                    where: {
                        id: quizId
                    }, data: {
                        ...input,
                    }
                })
                console.log("updated quiz is : ", quiz);
            }
        }
        res.status(201).json({ success: true, quiz, message: "Quiz created successfully" });
        return;
    } catch (err) {
        console.error("[CREATE_QUIZ_ERROR]", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
        return;
    }
}

