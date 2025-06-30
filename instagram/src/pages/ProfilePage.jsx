import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css/ProfilePage.css';

const ProfilePage = () => {
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [posts, setPosts] = useState([]);

    // Fetch profile data
    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await axios.get('http://localhost:5000/profile', { withCredentials: true });
                setFullname(response.data.fullname);
                setUsername(response.data.username);
                setBio(response.data.bio);
                // console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchProfile();
    }, []);

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
    }, []);

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

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img className="profile-dp" src="https://i.pravatar.cc/150?img=10" alt="Profile" />

                <div className="profile-info">
                    <div className="username-section">
                        <h2>{username}</h2>
                        <button className="btn">Follow</button>
                        <button className="btn">Message</button>
                    </div>

                    <div className="profile-stats">
                        <span><strong>{posts.length}</strong> posts</span>
                        <span><strong>300</strong> followers</span>
                        <span><strong>180</strong> following</span>
                    </div>

                    <div className="bio">
                        <strong>{fullname}</strong><br />
                        <p>{bio}</p>
                        <span onClick={updateBio} style={{ cursor: 'pointer', color: '#e1306c', fontSize: '0.9rem' }}>Edit Bio</span>
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
                                <p className='edite'>Edite</p>
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
