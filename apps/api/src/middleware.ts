import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function middleware(req: Request, res: Response, next: NextFunction){
    const header = req.headers.authorization!;
    try{
        const token = jwt.verify(header, process.env.JWT_SECRET!) as { id: string };
        req.userId = token.id;
        next();
    }catch(err){
        res.status(403).send("");
        console.log(err);
    }
}