import mongoose from "mongoose";

let commentSch = mongoose.Schema({
    postid: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'posts'
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'userlogin'
    },
    comments: {
        type: String,
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    
});

const CommentModel=mongoose.model('comments',commentSch)
export default CommentModel