import { Router, Express } from "express"
import startTrip from "./handlers/startTrip"
import { parseSchema } from "./middleware/parseSchema"
import { startTrackSchema } from "./schema/cartrack"
import getOrganization from "./handlers/organization/getOrganization"

export default (app: Express) => {
    const router = Router()

    router.get("/", (req, res) => {
        console.log("Hello, TypeScript with Express!")
        res.send("Hello, TypeScript with Express!")
    })

    router.get("/organization", getOrganization)

    app.use(router)
}
