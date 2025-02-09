import { z } from "zod"

export const userSchema = z.object({
    id: z.string(),
    email: z.string(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    nickname: z.string(),
    phoneNumber: z.string(),
})

export type user = z.infer<typeof userSchema>

export const UserPartialSchema = userSchema.partial()

export type UserPartial = z.infer<typeof UserPartialSchema>
