import {z} from 'zod'

export const UserObject = z.object({
    username: z.string(),
    password: z.string()
})