import { Request, Response } from "express"
import logger from "../../libs/logging/logger"
import { UserDTO } from "m-skauting-sdk"
import prisma from "../../libs/prisma"
import { NextFunction } from "express"

export default async function (req: Request, res: Response<UserDTO[]>, next: NextFunction) {
    try {
        const users = await prisma.user.findMany()
        logger.debug(users)
        if (!users) throw new Error("Users not found")
        res.json(users)
    } catch (error: unknown) {
        next(error)
    }
}
