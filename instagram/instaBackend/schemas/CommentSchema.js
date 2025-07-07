import mongoose from "mongoose";

let commentSch = mongoose.Schema({
    postid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userlogin'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userlogin'
    },
    comments: {
        type: String,
    },

}, {
    timestamp: true
});

const CommentModel = mongoose.model('comments', commentSch)
export default CommentModel