import { Router, Express } from "express"
import createUser from "./handlers/user/createUser"

export default (app: Express) => {
    const router = Router()

    router.get("/", (req, res) => {
        console.log("Hello, TypeScript with Express!")
        res.send("Hello, TypeScript with Express!")
    })

    router.post("/user/", createUser)

    app.use(router)
}
