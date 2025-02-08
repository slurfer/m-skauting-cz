import { Router, Express } from "express"
import startTrip from "./handlers/startTrip"
import { parseSchema } from "./middleware/parseSchema"
import { startTrackSchema } from "./schema/cartrack"
import getOrganization from "./handlers/organization/getOrganization"
import createOrganization from "./handlers/organization/createOrganization"

export default (app: Express) => {
    const router = Router()

    router.get("/", (req, res) => {
        console.log("Hello, TypeScript with Express!")
        res.send("Hello, TypeScript with Express!")
    })

    router.post("/organization/", createOrganization)
    router.get("/organization/:id", getOrganization)

    app.use(router)
}
