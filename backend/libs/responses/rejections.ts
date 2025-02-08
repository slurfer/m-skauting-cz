import { Response } from "express"
import { StatusCodes } from "http-status-codes"
import FieldProblem from "../../types/badRequest"

export const rejectBadRequest = (res: Response, messages: FieldProblem[]) => {
    res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid data", messages })
}
