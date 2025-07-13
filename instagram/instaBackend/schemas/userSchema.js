import mongoose from "mongoose";

let userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    pic: {
        type: String,
    },

    postids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'posts',
    }],

    commentids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'userlogin',
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'userlogin',
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'userlogin',
    }],

},{timestaps:true});

const UserModel = mongoose.model('userlogin', userSchema)
export default UserModel