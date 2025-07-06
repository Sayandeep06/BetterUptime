import express from "express"
export const websiteRouter = express.Router()
import {prismaClient} from "store/client"
import { middleware } from "./middleware";

websiteRouter.post('/', middleware, async (req, res)=>{
    if(!req.body.url){
        res.status(411).json({});
        return;
    }

    console.log(req.userId)

    const website = await prismaClient.website.create({
        data:{
            url: req.body.url,
            time_added: new Date(),
            user_id: req.userId!
        }
    })

    res.json({
        id: website.id
    })
})

