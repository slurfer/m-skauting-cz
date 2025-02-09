import { NextFunction, Request, Response } from "express"
import logger from "../../libs/logging/logger"
import prisma from "../../libs/prisma"
import { NotFoundRejection, UserDTO, UserPartialDTO, AlreadyExistsRejection } from "m-skauting-sdk"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { rejectAlreadyExists, rejectNotFound } from "../../libs/responses/rejections"

export default async function (
    req: Request<{ id: string }, unknown, UserPartialDTO>,
    res: Response<UserDTO | AlreadyExistsRejection | NotFoundRejection>,
    next: NextFunction,
) {
    try {
        const user = await prisma.user.update({ where: { id: req.params.id }, data: req.body })
        logger.debug(user)
        if (!user) throw new Error("User not found")
        res.json(user)
    } catch (error: unknown) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return rejectAlreadyExists(res, "User already exists")
            }
            if (error.code === "P2025") {
                return rejectNotFound(res, "User not found")
            }
        }
        next(error)
    }
}
