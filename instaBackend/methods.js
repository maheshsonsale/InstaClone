import UserModel from "./userSchema.js";
import PostModel from './postSchema.js';
import './database.js'
import jwt from 'jsonwebtoken'




// finding user profile === Login
export const getUserProfile = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email, password });

        if (!user) {
            console.log("User not found");
            return res.status(404).send("User not found");
        }
        const token = jwt.sign({ id: user._id }, "SECRET_KEY");

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
        });
        res.status(200).send("Login successful");
    } catch (error) {
        console.log("Login error:", error);
        res.status(500).send("Internal Server Error");
    }
};


//creating user profile === registration
export const creatUserProfile = async (req, res) => {
    try {
        const { fullname, username, email, password } = req.body
        await UserModel.create({ fullname, username, email, password })
        // console.log("user created successful");
    } catch (error) {
        console.log("userCreating Error", error);
    }
}



// creating user's post
export const createpost = async (req, res) => {
    const { content } = req.body;
    await PostModel.create({ content: content, userid: req.user._id })
    // console.log("poste success");
}



// loading my all post in profile page
export const MyPosts = async (req, res) => {

    let posts = await PostModel.find({ userid: req.user._id }).sort({ createdAt: -1 })
    // console.log(posts);
    res.send(posts)
}



// logout handler  but cookies are not working (deleting)
export const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true, // only if using HTTPS
        sameSite: "None" // important for cross-origin requests (like frontend localhost:5173, backend:5000)
    });
    console.log("User logged out");
    res.status(200).json({ message: "Logout successful" });
};



// loading profile data
export const profile = async (req, res) => {
    res.send(req.user)
}



// updating bio in profile page
export const updatebio = async (req, res) => {
    const { bio } = req.body;

    const userid = req.user._id;
    let user = await UserModel.updateOne({ _id: userid }, { $set: { bio: bio } })
    if (user.modifiedCount === 0) {
        return res.status(404).json({ message: "User not found or bio unchanged" });
    }
    res.status(200).json({ message: "Bio updated successfully", result: user });
    // console.log("bio updated successful");
}




// show all post in feed 

export const allposts = async (req, res) => {
    try {
        const userid = req.user._id;

        const posts = await PostModel.find()
            .sort({ createdAt: -1 })
            .populate("userid");

        // Add like/unlike flag in-memory only
        const modifiedPosts = posts.map((post) => {
            const isLiked = post.likes.includes(userid);

            return {
                ...post.toObject(), // convert mongoose doc to plain object
                likeunlike: isLiked ? "Unlike" : "Like",
                likeCount: post.likes.length,
            };
        });

        res.status(200).json(modifiedPosts);
    } catch (error) {
        console.error("Like/Unlike logic error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}



export const sideprofile = async (req, res) => {
    let user = await UserModel.findById(req.user._id)
    let otherUsers = await UserModel.find()
    res.json({ username: user.username, fullname: user.fullname, otherUsers: otherUsers })

}


// LIkes section
export const likes = async (req, res) => {
    try {
        const userid = req.user._id
        let { postid } = req.body
        let post = await PostModel.findById(postid)

        let alreadyLiked = post.likes.some(id => id.toString() === userid.toString())
        if (alreadyLiked) {
            post.likes = post.likes.filter(id => id.toString() !== userid.toString())
            await post.save()
            return res.json({ liked: false })
        }
        post.likes.push(userid)
        await post.save();
        return res.json({ liked: true })
    } catch (error) {
        console.log(error);
    }
}




