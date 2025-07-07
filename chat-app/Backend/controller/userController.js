import User from '../models/userModel.js'
import generateToken from '../config/generateToken.js';
import bcrypt from 'bcrypt'

export const register = async (req, res) => {

    
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400).send("Please enter all the details")
    }
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400).send("user already exist")
    }
    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed, pic })
    if (user) {
        res.status(201).json({ _id: user._id, name: user.name, email: user.email, pic: user.pic, token: generateToken(user._id) })
    } else {
        res.status(400).send("fail to create the user")
    }
}

export const authUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    const hashPassword = await bcrypt.compare(password, user.password)
    if (user && hashPassword) {
        res.status(200).json({ _id: user._id, name: user.name, email: user.email, pic: user.pic, token: generateToken(user._id) })
    } else {
        res.status(400).send("invalid credential")
    }
}




