import axios from 'axios';
import React, { useEffect, useState,useRef } from 'react';
import '../css/ProfilePage.css';


const ProfilePage = () => {
    const picUploadRef=useRef()
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [posts, setPosts] = useState([]);
    const [followers, setFollowers] = useState(0)
    const [following, setFollowing] = useState(0)
    const [imageUrl, setImageUrl] = useState()
    // const [pic, setPic] = useState("")


    // Fetch profile data
    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await axios.get('http://localhost:5000/profile', { withCredentials: true });
                setFullname(response.data.fullname);
                setUsername(response.data.username);
                setBio(response.data.bio);
                setFollowers(response.data.followers)
                setFollowing(response.data.following)
                setImageUrl(response.data.pic)
            } catch (error) {
                console.log(error);
            }
        }

        fetchProfile();
    },[]);

    // Fetch user's posts
    useEffect(() => {
        async function fetchMyPosts() {
            try {
                const response = await axios.get('http://localhost:5000/myposts', { withCredentials: true });
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error.message);
            }
        }

        fetchMyPosts();
    });

    // Update bio
    async function updateBio() {
        const newBio = prompt("Enter New Bio", bio);
        if (!newBio) return;
        setBio(newBio);

        try {
            await axios.post(
                'http://localhost:5000/updatebio',
                { bio: newBio },
                { withCredentials: true }
            );
        } catch (error) {
            console.log(error);
        }
    }

    async function deletepost(postid) {
        try {
            await axios.post(
                'http://localhost:5000/deletepost', { postid },
                { withCredentials: true }
            );
        } catch (error) {
            console.log(error);
        }
    }
    async function handlePic(e) {
        const file = e.target.files[0]
        if (!file) { return }

        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "instagram")
        data.append("cloud_name", "dzmmp468g")
        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/dzmmp468g/image/upload", data);
            await axios.post("http://localhost:5000/editPic", { imageUrl:res.data.secure_url  }, { withCredentials: true })
        } catch (error) {
            console.log("Upload failed:",error);
        }
    }
    return (
        <div className="profile-container">
            <div className="profile-header">
                <img className="profile-dp" src={imageUrl ? imageUrl: "https://i.pravatar.cc/150?img=10"} alt="No Image Found" onClick={()=>picUploadRef.current.click()} style={{cursor:"pointer"}}/>

                <div className="profile-info">
                    <div className="username-section">
                        <h2>{username}</h2>
                        <input type='file' className="btn" ref={picUploadRef} onChange={handlePic} style={{display:"none"}} />
                        
                        

                    </div>

                    <div className="profile-stats">
                        <span><strong>{posts.length}</strong> posts</span>
                        <span><strong>{followers.length}</strong> followers</span>
                        <span><strong>{following.length}</strong> following</span>
                    </div>

                    <div className="bio">
                        <strong>{fullname}</strong><br />
                        <p>{bio}<span onClick={updateBio} style={{ cursor: 'pointer', color: '#007bff', fontSize: '0.9rem', padding: '0 15px', textDecoration: 'underline' }}>Edite</span></p>

                    </div>
                </div>
            </div>

            <div className="dashboard-container">
                <h2 className="dashboard-title">📋 My Posts</h2>

                {posts.length === 0 ? (
                    <p className="no-posts">No Post Yet....</p>
                ) : (
                    <div className="posts-list">
                        {posts.map((post) => (
                            <div key={post._id} className="post-card">
                                <p className='edite' onClick={() => deletepost(post._id)}>Delete</p>
                                <p className="post-content">{post.content}</p>
                                <small className="post-meta">Posted on: {new Date(post.createdAt).toLocaleString()}</small>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
