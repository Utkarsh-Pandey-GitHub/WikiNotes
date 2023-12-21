import { NextFunction, Response, Request } from 'express';
import Model from './schema'


const findLoggedInUser = async(req: Request, res: Response, next: NextFunction) => {
    const activeEmail = req.body.email;
    // res.json(ActiveUser)
}
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    
    const currUser = req.body
    
    const ActiveUser = await Model.User.findOne({email:currUser.emailAddresses[0].emailAddress})

    if(!ActiveUser){

        console.log(currUser);
        const newUser = new Model.User({
            name: currUser.firstName?currUser.firstName:currUser.username,
            username: currUser.username,
            email:currUser.emailAddresses[0].emailAddress,
            imageUrl:currUser.imageUrl
    
        })
        console.log("request reached controller successfullly ansd now creating the user")
        res.send(newUser)
        await newUser.save()
    }
    res.send({
        msg:"user already exists",
        active:ActiveUser?._id
    })


}

const readAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const data = await Model.User.find()
    console.log("request reached READ ALL controller successfullly ansd now READING ALL the users");
    // console.log(data);

    res.json(data)
}

//experimental create-post{label, description , author}
const createPost = async (req: Request, res: Response, next: NextFunction) => {

    const labela = req.body?.label;
    const descriptiona = req.body?.description;
    const authora=req.body?.author;
    const newPost = new Model.Post({
        label: labela,
        description: descriptiona,
        author:authora

    })
    console.log("request reached controller successfullly ansd now creating the post");
    await Model.User.updateOne(
        {_id:authora},
        {$push:{articles:newPost}})
    await newPost.save();
}
const readAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    const data = await Model.Post.find()
    console.log("request reached READ ALL controller successfullly ansd now READING ALL the users");
    console.log(data);

    res.json(data)
}
const readMyPosts = async (req: Request, res: Response, next: NextFunction) => {
    console.log("request reached READ ALL controller successfullly ansd now READING MY  POST");
    const data = await Model.Post.find({author:req.params.uid})
    console.log('reached the controller');

    res.json(data)
}
const updatePost =  async (req: Request, res: Response, next: NextFunction) => {
    const p = req.body
    console.log(req.body)
    
    await Model.Post.updateOne({_id:p._id},p)
    console.log("post updated");
    
    res.send("done")
}
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body?.pid
    console.log("request reached delete controller",req.body);
    
    const u=req.body?.uid
    await Model.Post.deleteOne(
        {_id:id})
    await Model.User.updateOne(
      {_id:u},
      {$pull:{articles:{_id:id}}}
    )
    res.send("post is deleted removed linkage from user")
      
}
export default { createUser, readAllUsers, createPost, readAllPosts,readMyPosts,updatePost,deletePost }