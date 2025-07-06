import express from "express"
export const websiteRouter = express.Router()
import {prismaClient} from "store/client"

websiteRouter.post('/', async (req, res)=>{
    if(!req.body.url){
        res.status(411).json({});
        return;
    }

    const website = await prismaClient.website.create({
        data:{
            url: req.body.url,
            time_added: new Date(),
            user_id: "123"
        }
    })

    res.json({
        id: website.id
    })
})

