import { NextFunction, Request, Response } from "express"
import logger from "../../libs/logging/logger"
import prisma from "../../libs/prisma"
import { NotFoundRejection } from "m-skauting-sdk"
import { rejectNotFound } from "../../libs/responses/rejections"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export default async function (
    req: Request<{ id: string }>,
    res: Response<{ status: "ok" } | NotFoundRejection>,
    next: NextFunction,
) {
    try {
        const user = await prisma.user.delete({ where: { id: req.params.id } })
        logger.debug(user)
        if (!user) return rejectNotFound(res, "User not found")
        res.json({ status: "ok" })
    } catch (error: unknown) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                logger.debug(error)
                return rejectNotFound(res, "User not found")
            }
        }
        next(error)
    }
}
