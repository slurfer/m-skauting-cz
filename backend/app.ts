import express, { Request, Response } from "express"
import logger from "./libs/logging/logger"
import routes from "./routes"

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())

routes(app)

// Error handler
app.use((err: Error, req: Request, res: Response) => {
    console.error(err.stack) // Log chyby do konzole
    res.status(500).json({
        message: "Something went wrong!",
        error: err.message,
    })
})

app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`)
})
