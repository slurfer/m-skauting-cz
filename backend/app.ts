import express, { NextFunction, Request, Response } from "express"
import logger from "./libs/logging/logger"
import routes from "./routes"
import { GeneralRejection } from "m-skauting-sdk"
import { generalRejection } from "./libs/responses/rejections"

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())

routes(app)

// Error handler
app.use((err: Error, req: Request, res: Response<GeneralRejection>, _next: NextFunction) => {
    logger.error(err.stack)
    return generalRejection(res, 500, "Something went wrong!", err.message)
})

app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`)
})
