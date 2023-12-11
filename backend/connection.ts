// connecting to mongodb

import mongoose from "mongoose";

const uri ="mongodb+srv://UtkarshPandey:QLTBL90QLVJwG56h@clusternotemon.arht49h.mongodb.net/?retryWrites=true&w=majority"


const main = async ()=>{
    await mongoose.connect(uri)
}

export default main