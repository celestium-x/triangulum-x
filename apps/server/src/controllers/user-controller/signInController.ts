import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "@repo/db/client";


export default async function signInController(req: Request, res: Response) {
    console.log("inside sign in");
    const { user, account } = req.body;
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: user.email
            }
        })

        let myUser;
        if (existingUser) {
            myUser = await prisma.user.update({
                where: {
                    email: user.email!
                },
                data: {
                    name: user.name,
                    email: user.email,
                    image: user.image,
                }
            })
        } else {
            myUser = await prisma.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    image: user.image,
                }
            })
        }

        console.log("user is ", myUser);

        const jwtPayload = {
            name: myUser.name,
            email: myUser.email,
            id: myUser.id,
        };
        const secret = process.env.JWT_SECRET
        if (!secret) {
            res.status(300).json({
                message: "Server error"
            })
            return;
        }
        const token = jwt.sign(jwtPayload, secret);

        res.json({
            success: true,
            user: myUser,
            token: token
        });
        return;

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: "Authentication failed"
        });
        return;
    }
}