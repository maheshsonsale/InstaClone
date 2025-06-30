import mongoose from "mongoose";

let postsch = mongoose.Schema({
    content: {
        type: String
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'userlogin'
        }
    ],
    // likeunlike:{
    //     type:String,
    //     default:"Like"
    // },
    createdAt:{
        type:Date,
        default:Date.now
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userlogin'
    }
})

const PostModel=mongoose.model('posts',postsch)
export default PostModel