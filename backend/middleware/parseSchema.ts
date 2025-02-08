// src/middleware/validationMiddleware.ts
import { Request, Response, NextFunction } from "express"
import { z, ZodError } from "zod"
import FieldProblem from "../types/badRequest"
import { rejectBadRequest } from "../libs/responses/rejections"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseSchema(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body)
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const errorMessages: FieldProblem[] = error.errors.map((issue: any) => ({
                    message: issue.message,
                    field: issue.path.join("."),
                    received: issue.received,
                }))

                rejectBadRequest(res, errorMessages)
            } else {
                next(error)
            }
        }
    }
}
