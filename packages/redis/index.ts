import { createClient } from "redis";
// take the websites and id and add them to the stream xadd

//take the websites in bulk and start adding them 
async function getclient(){
    const client = await createClient()
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

    return client;
}

type Website = {
    url: string,
    id: string
}

export async function xAdd({url, id}: Website){
    const client = getclient();

    (await client).xAdd(
        'betteruptime:website', '*', {
            url,
            id
        }
    )
}

export async function xAddAll(websites: Website[]) {
    websites.forEach(
        async (e: Website) => {
            await xAdd(e);
        }
    )
}
