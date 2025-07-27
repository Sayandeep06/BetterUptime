import express from "express"
export const statusRouter = express.Router()
import {prismaClient} from 'store'
import { middleware } from "../middleware"

statusRouter.get('/:websiteId', middleware, async (req, res)=>{
    const website = await prismaClient.website.findFirst({
        where: {
            userId : req.userId,
            id: req.params.websiteId
        },
        include:{
            ticks:{
                orderBy:[{
                    createdAt: 'desc'
                }],
                take: 1
            }
        }
    })

    if(!website){
        res.status(409).json({
            message: "not found"
        })
    }

    res.json({
        website
    })
})

