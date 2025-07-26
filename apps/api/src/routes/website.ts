import express from "express"
export const websiteRouter = express.Router()
import {prismaClient} from "store"
import { middleware } from "../middleware"

websiteRouter.post('/', middleware, async (req, res)=>{
    if(!req.body.url){
        res.status(411).json({});
        return;
    }

    const website = await prismaClient.website.create({
        data:{
            url: req.body.url,
            timeAdded: new Date(),
            userId: req.userId as string
        }
    })

    res.json({
        id: website.id
    })
})

