import { Request, Response } from "express"
import logger from "../../libs/logging/logger"
import prisma from "../../libs/prisma"
// import { OrganizationDTO } from "m-skauting-sdk"

export default async function (req: Request, res: Response) {
    logger.debug(req.body)
    const organization = await prisma.organization.findFirst()
    res.json(organization)
}
