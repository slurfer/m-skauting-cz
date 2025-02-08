import { Request, Response } from "express"
import logger from "../libs/logging/logger"

export default function (req: Request, res: Response) {
    logger.debug(req.body)
    res.json({ sampleUser: "sampleValue" })
}
