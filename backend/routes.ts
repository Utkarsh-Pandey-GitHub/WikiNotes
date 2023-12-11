import express,{ NextFunction, Response,Request } from 'express'
import controller from './controller'
const router  = express.Router()


router.post("/new-user",controller.createUser)
router.get("/read-user",controller.readAllUsers)

export default router