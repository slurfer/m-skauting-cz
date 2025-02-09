import { z } from "zod"

export const UserSchema = z
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

export type UserDTO = z.infer<typeof UserSchema>

export const UserPartialSchema = UserSchema.partial()

export type UserPartialDTO = z.infer<typeof UserPartialSchema>
