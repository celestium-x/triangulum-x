import prisma from "@repo/db/client";
import { Request, Response } from "express";
import QuizAction from "../../class/quizAction";
import { createQuizSchema } from "../../schemas/createQuizSchema";

export default async function createQuizController(req: Request, res: Response) {
    const parsed = createQuizSchema.safeParse(req.body);

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
        const quiz = await prisma.quiz.create({
            data: {
                ...input,
                participantCode: QuizAction.generateCode(8),
                spectatorCode: QuizAction.generateCode(8),
                scheduledAt: input.scheduledAt ? new Date(input.scheduledAt) : undefined,
                hostId: String(hostId)
            },
        });

        res.status(201).json({ success: true, quiz, message: "Quiz created successfully" });
        return;
    } catch (err) {
        console.error("[CREATE_QUIZ_ERROR]", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
        return;
    }
}

