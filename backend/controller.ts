import { NextFunction, Response, Request } from 'express';
import Model from './schema'



const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const userid = req.body
    //console.log("request reached getuser controller successfullly ansd now getting the user", req.body);
    const user = await Model.User.findOne({ _id: userid.id })
    if (user) {
        res.send(user)
    }
    else {
        res.send("user not found")
    }
}
const createUser = async (req: Request, res: Response, next: NextFunction) => {

    const currUser = req.body

    const ActiveUser = await Model.User.findOne({ email: currUser.emailAddresses[0].emailAddress })

    if (!ActiveUser) {

        //console.log(currUser);
        const newUser = new Model.User({
            name: currUser.firstName ? currUser.firstName : currUser.username,
            username: currUser.username,
            email: currUser.emailAddresses[0].emailAddress,
            imageUrl: currUser.imageUrl

        })
        //console.log("request reached controller successfullly ansd now creating the user")
        res.send(newUser)
        await newUser.save()
    }
    res.send({
        msg: "user already exists",
        active: ActiveUser?._id
    })


}

const readAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const data = await Model.User.find()
    //console.log("request reached READ ALL controller successfullly ansd now READING ALL the users");
    // //console.log(data);

    res.json(data)
}

//experimental create-post{label, description , author}
const createPost = async (req: Request, res: Response, next: NextFunction) => {

    const labela = req.body?.label;
    const descriptiona = req.body?.description;
    const link = req.body?.link;

    const authora = req.body?.author;
    const file = req.body?.file
    //console.log("file",req.body.file);

    const newPost = new Model.Post({
        ...req.body

    })
    //console.log("request reached controller successfullly ansd now creating the post", req.body);
    await Model.User.updateOne(
        { _id: authora },
        { $push: { articles: newPost } })
    await newPost.save();


}
const readAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    const data = await Model.Post.find()
    //console.log("request reached READ ALL controller successfullly ansd now READING ALL the users");
    //console.log(data);

    res.json(data)
}
const readMyPosts = async (req: Request, res: Response, next: NextFunction) => {
    //console.log("request reached READ ALL controller successfullly ansd now READING MY  POST");
    const data = await Model.Post.find({ author: req.params.uid })
    //console.log('reached the controller');

    res.json(data)
}
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    const p = req.body
    //console.log(req.body)

    await Model.Post.updateOne({ _id: p._id }, p)
    //console.log("post updated");

    res.send("done")
}
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body?.pid
    //console.log("request reached delete controller", req.body);

    const u = req.body?.uid
    await Model.Post.deleteOne(
        { _id: id })
    await Model.User.updateOne(
        { _id: u },
        { $pull: { articles: { _id: id } } }
    )
    res.send("post is deleted removed linkage from user")

}

//chat operations
//create chat
//read chat
// chat = {members:[],messages:[]}
// chat_msg = {message:"",sender:"",receiver:""}

const newChat = async (req: Request, res: Response, next: NextFunction) => {
    //check if chat exists
    //console.log("\nrequest reached new chat controller", req.body);

    const { sender, receiver } = req.body;
    const chat = await Model.Chat.findOne({
        $or: [
            { members: [sender, receiver] },
            { members: [receiver, sender] }
        ]
    })
    //if not create chat
    if (!chat) {
        const newChat = new Model.Chat({
            members: [sender, receiver],
            messages: []
        })
        await newChat.save()
        res.json({ id: newChat._id })
    }
    else {
        res.json({ id: chat?._id })
    }



}

const handleMsg = async (req: Request, res: Response, next: NextFunction) => {
    //console.log("\nrequest reached handle msg controller", req.body);
    const { sender, message, receiver, chatid } = req.body;


    const newMsg = new Model.Chat_msg({
        message: message,
        sender: sender,
        receiver: receiver

    })
    await newMsg.save()
    await Model.Chat.updateOne(
        { _id: chatid },
        { $push: { messages: newMsg } })
    res.send('chat saved')
}

const fetchChat = async (req: Request, res: Response, next: NextFunction) => {
    //console.log("\nrequest reached fetch chat controller", req.body);
    const { chatId } = req.body


    if (chatId) {

        const chat = await Model.Chat.findOne({ _id: chatId })


        res.json({ messages: chat?.messages })
    }
    else {
        res.send('no chat found')
    }
}



export default { getUser, createUser, readAllUsers, createPost, readAllPosts, readMyPosts, updatePost, deletePost, newChat, handleMsg, fetchChat }