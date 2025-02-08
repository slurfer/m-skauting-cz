import { Request, Response } from "express"
import logger from "../../libs/logging/logger"
import prisma from "../../libs/prisma"

export default function (req: Request, res: Response) {
    logger.debug(req.body)
    prisma.organization.findFirst({
        data: {
            id: "123",
            name: "Test organization",
            orgNumber: "123456789",
        },
    })
    res.json({ sampleUser: "sampleValue" })
}
