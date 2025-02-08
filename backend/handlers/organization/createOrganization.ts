import { Request, Response } from "express"
import logger from "../../libs/logging/logger"
import prisma from "../../libs/prisma"
import { OrganizationDTO } from "m-skauting-sdk"

export default async function (req: Request, res: Response<OrganizationDTO>) {
    logger.debug(req.body)
    const organization = await prisma.organization.create({
        data: {
            id: "123",
            name: "Test organization",
            orgNumber: "123456789",
        },
    })
    res.json(organization)
}
