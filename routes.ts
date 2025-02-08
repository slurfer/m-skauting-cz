import { Router, Express, Request, Response, NextFunction } from 'express';
import startTrip from './handlers/startTrip';
import { parseSchema } from './middleware/parseSchema';
import { startTrackSchema } from './schema/cartrack';
import logger from './libs/logging/logger';

function middlewareLogger(ahoj: string) {
    return function (req: Request, res: Response, next: NextFunction): void {
        logger.debug(req.body);
        next();
    };
}

export default (app: Express) => {
    const router = Router();

    router.get('/', (req, res) => {
        res.send('Hello, TypeScript with Express!');
    });

    router.post('/trip/start', parseSchema(startTrackSchema), startTrip);

    app.use(router);
};
