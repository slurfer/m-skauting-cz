import express, { Request, Response, NextFunction } from "express"
import logger from "./libs/logging/logger"

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())

require("./routes").default(app)

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack) // Log chyby do konzole
    res.status(500).json({
        message: "Something went wrong!",
        error: err.message,
    })
})

app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`)
})
