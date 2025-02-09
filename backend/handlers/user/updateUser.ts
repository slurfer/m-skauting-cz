import { NextFunction, Request, Response } from "express"
import logger from "../../libs/logging/logger"
import { UserDTO } from "../../../packages/m-skauting-sdk/src/types"
import prisma from "../../libs/prisma"
import { UserPartial } from "../../schema/apiSchema"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { rejectAlreadyExists } from "../../libs/responses/rejections"
import { AlreadyExistsRejection } from "m-skauting-sdk"

export default async function (
    req: Request<{ id: string }, unknown, UserPartial>,
    res: Response<UserDTO | AlreadyExistsRejection>,
    next: NextFunction,
) {
    try {
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
    } catch (error: unknown) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return rejectAlreadyExists(res, "User already exists")
            }
        }
        next(error)
    }
}
