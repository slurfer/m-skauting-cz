import { Request, Response } from "express"
import logger from "../../libs/logging/logger"
import { UserDTO } from "../../../packages/m-skauting-sdk/src/types"
import prisma from "../../libs/prisma"

export default async function (req: Request, res: Response<UserDTO[]>) {
    const users = await prisma.user.findMany()
    logger.debug(users)
    if (!users) throw new Error("Users not found")
    res.json(users)
}
