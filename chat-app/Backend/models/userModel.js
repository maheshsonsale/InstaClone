import mongoose from "mongoose";
const userModel = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true,unique:true },
    password: { type: String, required: true },
    pic: {
        type: String,
        default: 'https://avatars.githubusercontent.com/u/583231?v=4',
    },
}, { timstamps: true })

const User = mongoose.model("User", userModel)
export default User