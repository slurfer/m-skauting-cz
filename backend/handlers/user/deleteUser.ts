import { Request, Response } from "express"
import logger from "../../libs/logging/logger"
import { UserDTO } from "../../../packages/m-skauting-sdk/src/types"
import prisma from "../../libs/prisma"

export default async function (req: Request, res: Response<UserDTO>) {
    const user = await prisma.user.delete({ where: { id: req.params.id } })
    logger.debug(user)
    if (!user) throw new Error("User not found")
    res.json(user)
}
