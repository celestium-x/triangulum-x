import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";

export default async function authMiddleware(req: Request, res: Response, next:NextFunction) {
    const authHeader = req.headers.authorization;
    console.log("authHEader",authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    console.log("token and secret",token,secret);

    if (!secret) {
        res.status(500).json({ message: "JWT secret not configured" });
        return;
    }
    if (!token) {
        res.status(500).json({ message: "Token is not avilable" });
        return;
    }

    try {
        jwt.verify(token, secret, (err,decoded) =>{
            if(err){
                res.status(401).json({message:"Not authorized"});
                return;
            }
            console.log("Decoded",decoded);
            req.user=decoded as AuthUser
            console.log("req.user is",req.user);
            next();
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};