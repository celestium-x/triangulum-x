import { Request, Response } from "express"
import prisma from "@repo/db/client"

export default async function authMiddleware(req: Request, res: Response) {
    const { name, email, image } = req.body;

    if (!email) {
        res.status(400).json({ message: "Email is required" });
        return;
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        });

        if (existingUser) {
            await prisma.user.update({
                where: { email: email },
                data: { name, image }
            });
            res.json({ message: "Sign In successful" });
        } else {
            await prisma.user.create({
                data: { email, name, image }
            });
            res.json({ message: "Sign up successful" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};