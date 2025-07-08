import UserModel from "./schemas/userSchema.js";
import PostModel from './schemas/postSchema.js';
import CommentModel from "./schemas/CommentSchema.js";
import './config/db.js'
import jwt from 'jsonwebtoken'



// CommentModel.find()

// finding user profile === Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email })

        

        if (!user || user.password !== password) {
            console.log("User not foundjs");
            return res.status(404).send({ message: "User not found", isLogin: false });
        }
        const token = jwt.sign({ id: user._id }, "SECRET_KEY");

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
        });
        res.status(200).send({ message: "Login successful", isLogin: true });
    } catch (error) {
        console.log("Login error:", error);
        res.status(500).json({ messege: "Internal Server Error" });
    }
};


//creating user profile === registration
export const registration = async (req, res) => {
    try {
        const { fullname, username, email, password } = req.body
        const isAccount = await UserModel.findOne({ email: email })

        if (!isAccount) {
            const user = await UserModel.create({ fullname, username, email, password })
            const token = jwt.sign({ id: user._id }, "SECRET_KEY");
            res.cookie('token', token, {
                httpOnly: true,
                sameSite: "lax",
                secure: false,
            });
            return res.status(201).json({ success: true })
        }

        return res.status(409).json({ success: false })

    } catch (error) {
        console.log("userCreating Error", error);
    }
}



// creating user's post
export const createpost = async (req, res) => {
    try {
        const user = req.user;
        const { content,image } = req.body;
        const newPost = await PostModel.create({ content: content, userid:user._id ,image:image})
        user.postsid.push(newPost._id)
        await user.save()
    } catch (error) {
        console.log(error);
    }
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
    // console.log("User logged out");
    res.status(200).json({ message: "Logout successful" });
};



// loading profile data
export const profile = async (req, res) => {
console.log("hello");

    const myuser=await UserModel.findOne({_id:req.user._id}) .populate('followers')
    console.log(myuser);
       


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
// console.log(posts);

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
    const loggedInUserId = req.user._id.toString()
    let allUser = await UserModel.find()
    const otherUsers = allUser.filter(user => user._id.toString() !== loggedInUserId).map((user) => {
        const isFollowing = user.followers.some(followerId => followerId.toString() === loggedInUserId)
        return {
            ...user.toObject(),
            follUnfoll: isFollowing ? "Unfollow" : "Follow",
        }
    })
    res.json({ username: req.user.username, fullname: req.user.fullname,pic:req.user.pic ,otherUsers: otherUsers })

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

export const comments = async (req, res) => {
    try {

        const { postid, comments } = req.body;
        const sender = req.user._id;
        await CommentModel.create({ postid:postid, comments:comments, sender:sender })
    } catch (error) {
        console.log("Comment Error", error);
    }


}
export const loadAllComments=async(req,res)=>{
    const {postid}=req.body;
    const postComments=await CommentModel.find({postid:postid})
    // console.log(postComments);
    res.send(postComments)
}


export const deletepost = async (req, res) => {
    const post = PostModel.findById(req.body.postid)
    await post.deleteOne()
    // console.log("post deleted successful");

}

export const followers = async (req, res) => {
    try {
        const userid = req.user._id;
        const frontuserid = req.body.frontuserid;
        const frontuUser = await UserModel.findById(frontuserid)
        const isFollowing = frontuUser.followers.some(id => id.toString() === userid.toString())
        if (isFollowing) {
            frontuUser.followers = frontuUser.followers.filter(id => id.toString() !== userid.toString())
            await frontuUser.save()
            return res.json({ follow: false })
        }
        frontuUser.followers.push(userid)
        await frontuUser.save()
        return res.json({ follow: true })
    } catch (error) {
        console.log(error);

    }

}

export const following = async (req, res) => {
    try {
        const user = req.user
        const frontuserid = req.body.frontuserid;

        const isFollowing = user.following.some(id => id.toString() === frontuserid.toString());
        if (isFollowing) {
            user.following = user.following.filter(id => id.toString() !== frontuserid.toString());
            await user.save()
            return
        }
        user.following.push(frontuserid)
        await user.save()
    } catch (error) {
        console.log(error);

    }

}


export const otherPersonPosts = async (req, res) => {
    const { userid } = req.body
    // let pop=await UserModel.findOne({userid:'6860fa856790e50b8958f16e'}).populate()
    // console.log(pop);
    
    let posts=await PostModel.find({userid:userid})
    res.send(posts)
    

}
export const editPic = async (req, res) => {
    const { imageUrl } = req.body;
    await UserModel.updateOne({_id:req.user._id},{$set:{pic:imageUrl}})
}
export const search = async (req, res) => {
    try {
        const { search } = req.body;
        const users=await UserModel.find({username:{$regex:search,$options:'i'}}).select('-password')
        res.status(200).send(users)
    } catch (error) {
        res.status(400).send(error)
    }   
}

