// src/middleware/validationMiddleware.ts
import { Request, Response, NextFunction } from "express"
import { z, ZodError } from "zod"
import { rejectBadRequestBody } from "../libs/responses/rejections"

export function parseSchema(schema: z.ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body)
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                const firstError = error.errors[0]
                rejectBadRequestBody(res, firstError.message, firstError.path.join("."))
            } else {
                next(error)
            }
        }
    }
}
