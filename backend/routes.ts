import express,{ NextFunction, Response,Request } from 'express'
import controller from './controller'
import Model from './schema'
const router  = express.Router()

// router.use(express.json())
router.post("/new-user",controller.createUser)
router.get("/read-user",controller.readAllUsers)
router.post("/new-post",controller.createPost)
router.get("/read-post",controller.readAllPosts)


export default router