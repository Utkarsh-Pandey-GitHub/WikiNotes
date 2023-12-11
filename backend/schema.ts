import mongoose,{Schema,Document} from 'mongoose'


interface post extends Document{
    label:String,
    description?:String,
    author:mongoose.Types.ObjectId
}
interface user extends Document{
    name:String,
    username:String,
    total_articles?:Number,
    articles?:post[]
}


const postSchema = new Schema<post>({
    label:{
        type:String,
        required:true
    },
    description:{
        type:String,
        
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }

    
})
const userSchema = new Schema<user>({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    total_articles:{
        type:Number,
        required:false
    },
    articles:{
        type:[postSchema],
        ref:'Post'

    }
})

const User = mongoose.model<user>('User',userSchema)
const Post = mongoose.model<post>('Post',postSchema)

export default { User,Post}