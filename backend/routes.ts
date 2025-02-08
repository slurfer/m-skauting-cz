import { Router, Express } from "express"
import startTrip from "./handlers/startTrip"
import { parseSchema } from "./middleware/parseSchema"
import { startTrackSchema } from "./schema/cartrack"

export default (app: Express) => {
    const router = Router()

    router.get("/", (req, res) => {
        res.send("Hello, TypeScript with Express!")
    })

    router.post("/trip/start", parseSchema(startTrackSchema), startTrip)

    app.use(router)
}
