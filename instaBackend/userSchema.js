import mongoose from "mongoose";

let userSchema = mongoose.Schema({
    fullname: {
        type: String,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    bio: {
        type: String,
    },
    postsId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts'
    },],
});

const UserModel=mongoose.model('userlogin',userSchema)
export default UserModel