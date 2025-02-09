import { Router, Express } from "express"
import createUser from "./handlers/user/createUser"
import { parseSchema } from "./middleware/parseSchema"
import { userSchema } from "./schema/apiSchema"

export default (app: Express) => {
    const router = Router()

    router.get("/", (req, res) => {
        console.log("Hello, TypeScript with Express!")
        res.send("Hello, TypeScript with Express!")
    })

    router.post("/user/", parseSchema(userSchema), createUser)

    app.use(router)
}
