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
        // res.json(newUser)
        await newUser.save()
    }
    res.send("user already exists")


}

// {
//     '{"pathRoot":"/me","id":"user_2YaA1cn0IuN3BNTlWKeztTdDlOq","externalId":null,"username":"utkarsh","emailAddresses":[{"pathRoot":"/me/email_addresses","emailAddress":"theutkarshmail@gmail.com","linkedTo":': {
//         '{"pathRoot":"","id":"idn_2YaA095zUiXPszggEVqcKdizfaH","type":"oauth_google"},{"pathRoot":"","id":"idn_2ZXxeOr8tn15py64QtrHAc5HAaO","type":"oauth_google"}': [[Object]]
//     }
// }
//experimental
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
    // const authora=req.body.author;
    const newPost = new Model.Post({
        label: labela,
        description: descriptiona,

    })
    console.log("request reached controller successfullly ansd now creating the post");
    await newPost.save();
}
const readAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    const data = await Model.Post.find()
    console.log("request reached READ ALL controller successfullly ansd now READING ALL the users");
    console.log(data);

    res.json(data)
}

export default { createUser, readAllUsers, createPost, readAllPosts }