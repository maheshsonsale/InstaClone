import axios from 'axios';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../css/ProfilePage.css';

const OtherPerson = () => {


    
    const location = useLocation()
    const passedData = location.state?.userdata;



    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [posts, setPosts] = useState([]);
    const [followers, setFollowers] = useState(0)
    const [following, setFollowing] = useState(0)
    const [pic,setPic]=useState('')


    useEffect(() => {

        setFullname(passedData.fullname);
        setUsername(passedData.username || '');
        setBio(passedData.bio);
        setFollowers(passedData.followers)
        setFollowing(passedData.following)
        setPic(passedData.pic)
        // setPosts(passedData.posts)
    }, [passedData])

  // Fetch user's posts
    useEffect(() => {
        async function fetchMyPosts() {
            try {
                const response = await axios.post('http://localhost:5000/otherPersonPosts',{userid:passedData._id}, { withCredentials: true });
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error.message);
            }
        }

        fetchMyPosts();
    });


    // Update bio
    return (
        <div className="profile-container">
            <div className="profile-header">
                <img className="profile-dp" src={pic?pic:"https://i.pravatar.cc/150?img=10"} alt="Profile" />

                <div className="profile-info">
                    <div className="username-section">
                        <h2>{username}</h2>
                        <button className="btn">Follow</button>

                    </div>

                    <div className="profile-stats">
                        <span><strong>{posts.length}</strong> posts</span>
                        <span><strong>{followers.length}</strong> followers</span>
                        <span><strong>{following.length}</strong> following</span>
                    </div>

                    <div className="bio">
                        <strong>{fullname}</strong><br />
                        <p>{bio}</p>

                    </div>
                </div>
            </div>

            <div className="dashboard-container">
                <h2 className="dashboard-title">{username}' posts</h2>

                {posts.length === 0 ? (
                    <p className="no-posts">No Post Yet....</p>
                ) : (
                    <div className="posts-list">
                        {posts.map((post) => (
                            <div key={post._id} className="post-card">
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

export default OtherPerson;
