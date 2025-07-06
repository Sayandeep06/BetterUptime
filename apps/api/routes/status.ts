import express from "express"
import { middleware } from "./middleware"
import { prismaClient } from "store/client"
export const statusRouter = express.Router()

statusRouter.get('/:websiteId', middleware, async (req, res)=>{
    const website = await prismaClient.website.findFirst({
        where:{
            id: req.params.websiteId,
            user_id: req.userId
        },
        include: {
            ticks:{
                orderBy: [{
                    createdAt: 'desc'
                }],
                take: 1
            }
        }
    })

    if(!website){
        res.status(409).json({
            message: "Not found"
        })
        return;
    }

    res.json({
        website
    })
})

