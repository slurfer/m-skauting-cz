import { Request, Response } from "express"
import logger from "../../libs/logging/logger"
import { UserDTO } from "../../../packages/m-skauting-sdk/src/types"
import prisma from "../../libs/prisma"
import { UserPartial } from "../../schema/apiSchema"

export default async function (req: Request<{ id: string }, unknown, UserPartial>, res: Response<UserDTO>) {
    const user = await prisma.user.update({ where: { id: req.params.id }, data: req.body })
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
