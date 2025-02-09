import { z } from "zod"

export const userSchema = z
    .object({
        id: z.string(),
        email: z.string().email({ message: "Zadejte prosím platnou emailovou adresu." }),
        password: z.string().min(8, { message: "Heslo musí mít alespoň 8 znaků." }),
        firstName: z.string(),
        lastName: z.string(),
        nickname: z.string(),
        phoneNumber: z.string(),
    })
    .strict()

export type user = z.infer<typeof userSchema>

export const UserPartialSchema = userSchema.partial()

export type UserPartial = z.infer<typeof UserPartialSchema>
