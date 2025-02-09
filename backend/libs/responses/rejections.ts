import { Response } from "express"
import { StatusCodes } from "http-status-codes"
import { AlreadyExistsRejection, BadRequestBodyRejection, NotFoundRejection, GeneralRejection } from "m-skauting-sdk"

export const generalRejection = (res: Response<GeneralRejection>, code: number, name: string, message: string) => {
    res.status(code).json({
        code: code.toString(),
        name: name,
        message: message,
    })
}

export const rejectNotFound = (res: Response<NotFoundRejection>, message: string) => {
    res.status(StatusCodes.NOT_FOUND).json({
        code: "404",
        name: "NotFound",
        message,
    })
}

export const rejectBadRequestBody = (res: Response<BadRequestBodyRejection>, message: string, field: string) => {
    res.status(StatusCodes.BAD_REQUEST).json({
        code: "400",
        name: "BadRequestBody",
        message,
        field,
    })
}

export const rejectAlreadyExists = (res: Response<AlreadyExistsRejection>, message: string) => {
    res.status(StatusCodes.BAD_REQUEST).json({ code: "400", name: "AlreadyExists", message })
}
