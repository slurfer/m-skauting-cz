import { Request, Response } from "express"
import logger from "../../libs/logging/logger"
import { UserDTO } from "../../../packages/m-skauting-sdk/src/types"
import prisma from "../../libs/prisma"
import { NotFoundRejection } from "m-skauting-sdk"
import { rejectNotFound } from "../../libs/responses/rejections"

export default async function (req: Request<{ id: string }>, res: Response<UserDTO | NotFoundRejection>) {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } })
    logger.debug(user)
    if (!user) return rejectNotFound(res, "User not found")
    res.json(user)
}
