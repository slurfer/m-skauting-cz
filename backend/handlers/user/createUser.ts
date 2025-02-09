import { Request, Response, NextFunction } from "express"
import logger from "../../libs/logging/logger"
import { UserDTO } from "../../../packages/m-skauting-sdk/src/types"
import prisma from "../../libs/prisma"
import { user } from "../../schema/apiSchema"
import { rejectAlreadyExists } from "../../libs/responses/rejections"
import { AlreadyExistsRejection } from "m-skauting-sdk"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export default async function (
    req: Request<unknown, unknown, user>,
    res: Response<UserDTO | AlreadyExistsRejection>,
    next: NextFunction,
) {
    try {
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
    } catch (error: unknown) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                logger.debug(error)
                return rejectAlreadyExists(res, "User already exists")
            }
        }
        next(error)
    }
}
