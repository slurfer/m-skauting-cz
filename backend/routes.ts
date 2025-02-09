import { Router, Express } from "express"
import createUser from "./handlers/user/createUser"
import { parseSchema } from "./middleware/parseSchema"
import { UserPartialSchema, userSchema } from "./schema/apiSchema"
import getUsers from "./handlers/user/getUsers"
import getUser from "./handlers/user/getUser"
import updateUser from "./handlers/user/updateUser"
import deleteUser from "./handlers/user/deleteUser"
export default (app: Express) => {
    const router = Router()

    router.get("/", (req, res) => {
        console.log("Hello, TypeScript with Express!")
        res.send("Hello, TypeScript with Express!")
    })

    router.get("/users", getUsers)
    router.get("/user/:id", getUser)
    router.post("/user/", parseSchema(userSchema), createUser)
    router.put("/user/:id", parseSchema(UserPartialSchema), updateUser)
    router.delete("/user/:id", deleteUser)

    app.use(router)
}
