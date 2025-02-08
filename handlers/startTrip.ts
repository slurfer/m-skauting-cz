import { Request, Response, NextFunction } from 'express';
import prisma from '../libs/prisma';
import logger from '../libs/logging/logger';

export default function (req: Request, res: Response, next: NextFunction) {
    logger.debug(req.body);
    res.json({ sampleUser: 'sampleValue' });
}
