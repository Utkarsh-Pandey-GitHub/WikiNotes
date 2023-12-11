import { NextFunction, Response,Request } from 'express';
import Model from './schema'


const createUser=async(req:Request,res:Response,next:NextFunction)=>{
    const newUser= new Model.User({
        name:"MayaAngelou",
        username:"MayaAngel"
        
    })
    console.log("request reached controller successfullly ansd now creating the user");
    
    await newUser.save()
    
}
//experimental
const readAllUsers = async(req:Request,res:Response,next:NextFunction)=>{
    const data = await Model.User.find()
    console.log("request reached READ ALL controller successfullly ansd now READING ALL the users");
    console.log(data);
    
    res.json(data)
}

export default {createUser,readAllUsers}