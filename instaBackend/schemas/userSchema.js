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
    createAt: {
        type: Date,
        default: Date.now
    },
    bio: {
        type: String,
    },
    postsid: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'posts',
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'userlogin',
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'userlogin',
    }],

});

const UserModel = mongoose.model('userlogin', userSchema)
export default UserModel