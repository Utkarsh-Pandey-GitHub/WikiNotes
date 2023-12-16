import mongoose, { Schema, Document } from 'mongoose'
// import validator from 'validator'

interface post extends Document {
    label: String,
    description?: String,
    author: mongoose.Types.ObjectId
}
interface user extends Document {
    name: String,
    username: String,
    email: String,
    imageUrl?:String,
    total_articles?: Number,
    articles?: post[]
}


const postSchema = new Schema<post>({
    label: {
        type: String,
        required: true
    },
    description: {
        type: String,

    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }


})
const userSchema = new Schema<user>({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique:true,
        // validate: {
        //     validator: validator.isEmail,
        //     message: 'Invalid email format',
        // }
    },
    imageUrl:{
        type:String
    },
    total_articles: {
        type: Number,
        required: false
    },
    articles: {
        type: [postSchema],
        ref: 'Post'

    }
})

const User = mongoose.model<user>('User', userSchema)
const Post = mongoose.model<post>('Post', postSchema)

export default { User, Post }