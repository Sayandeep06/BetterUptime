import {prismaClient} from 'store'
import { xAdd } from 'redisclient'
import { xAddAll } from 'redisclient'

async function publisher(){
    const websites = await prismaClient.website.findMany({
        select: {
            url: true,
            id: true
        }
    })
}

setInterval(() => {
    publisher()
}, 3*1000);

publisher();