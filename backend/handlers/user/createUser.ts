import { Request, Response } from "express"
import logger from "../../libs/logging/logger"
import { UserDTO } from "../../../packages/m-skauting-sdk/src/types"
import prisma from "../../libs/prisma"
import { user } from "../../schema/apiSchema"

export default async function (req: Request<unknown, unknown, user>, res: Response<UserDTO>) {
    const user = await prisma.user.create({ data: req.body })
    logger.debug(user)
    if (!user) throw new Error("User not found")
    res.json({
        id: user.id,
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        nickname: user.nickname,
        phoneNumber: user.phoneNumber,
    })
}
