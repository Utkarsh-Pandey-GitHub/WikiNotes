import express,{ NextFunction, Response,Request } from 'express'
import controller from './controller'
import Model from './schema'
const router  = express.Router()

router.post("/new-user",controller.createUser)
router.get("/read-user",controller.readAllUsers)
router.post("/new-post",controller.createPost)
router.get("/read-posts",controller.readAllPosts)
router.get("/read-post/:uid", async (req: Request, res: Response, next: NextFunction) => {
    console.log("request reached READ ALL controller successfullly ansd now READING MY  POST");
    console.log(req.params.uid);
    
    const data = await Model.Post.find({author:req.params.uid})
    console.log('reached the controller');

    res.json(data)
})
router.post("/update-post",controller.updatePost)
router.post("/delete-post",controller.deletePost)


export default router