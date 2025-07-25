import express from "express";
import { UserObject } from "../types";
import { prismaClient } from "store";
import jwt from 'jsonwebtoken';
export const userRouter = express.Router();

userRouter.post('/signup', async(req, res)=>{
    const userData = UserObject.safeParse(req.body);
    if(!userData.success){
        res.status(403).json({})
        return 
    }
    
    const user = await prismaClient.user.create({
        data:{
            username: userData.data.username,
            password: userData.data.password
        }
    })
    
    res.status(200).json({
        id: user.id
    })

})

userRouter.post('/signin', async (req, res)=>{
    const userData = UserObject.safeParse(req.body);
    if(!userData.success){
        res.status(403).json({})
        return 
    }
    const user = await prismaClient.user.findFirst({
        where:{
            username: userData.data.username
        }
    })

    if(!user || user.password!== userData.data.password){
        res.status(403).json({})
        return
    }

    const token = jwt.sign({
        id: user.id
    }, process.env.JWT_SECRET!)

    res.json({
        jwt: token
    })
})