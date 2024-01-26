import mongoose, { Schema, Document } from 'mongoose'
// import validator from 'validator'

interface post extends Document {
    label: String,
    description?: String,
    link?: String,
    author: mongoose.Types.ObjectId
}
interface user extends Document {
    name: String,
    username: String,
    email: String,
    imageUrl?: String,
    total_articles?: Number,
    articles?: post[]
}
interface chat_msg extends Document {
    message: String,
    sender: mongoose.Types.ObjectId,
    receiver?: mongoose.Types.ObjectId

}
interface chat extends Document {
    members: mongoose.Types.ObjectId[],
    messages: chat_msg[]
}

const postSchema = new Schema<post>({
    label: {
        type: String,
        required: true
    },
    description: {
        type: String,

    },
    link: {
        type: String
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
        unique: true,
        // validate: {
        //     validator: validator.isEmail,
        //     message: 'Invalid email format',
        // }
    },
    imageUrl: {
        type: String
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
const chat_msgSchema = new Schema<chat_msg>({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
})
const chatSchema = new Schema<chat>({
    members: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: true
    },
    messages: {
        type: [chat_msgSchema],
        ref: 'Chat'
    }
})

const Chat = mongoose.model<chat>('Chat', chatSchema)
const Chat_msg = mongoose.model<chat_msg>('Chat_msg', chat_msgSchema)
const User = mongoose.model<user>('User', userSchema)
const Post = mongoose.model<post>('Post', postSchema)

export default { User, Post, Chat, Chat_msg }