import type { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'

export const middleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization!;
    try{
        const data = jwt.verify(header, process.env.JWT_SECRET!)
        if(typeof data === 'string'){
            res.status(403).send("Invalid")
            return;
        }
        req.userId = data.id;
        next();
    }catch(e){
        res.status(403).json({})
        return;
    }
}