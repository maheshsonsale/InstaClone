import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/FeedPage.css';

const FeedPage = () => {
    const [posts, setPosts] = useState([]);
    

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/allposts', {
                    withCredentials: true,
                });
                setPosts(response.data);
                // console.log(response.data);
                
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    });

    async function handleLike(postid) {
        try {
            await axios.put('http://localhost:5000/likes',{postid}, {
                withCredentials: true,
            });
            
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    return (
        <div className="feed-container">
            <h2 className="feed-title">📸 All Posts</h2>
            {posts.length === 0 ? (
                <p>No posts available</p>
            ) : (
                posts.map((post) => (

                    <div className="feed-post" key={post._id}>
                        {/* <h1>{post._id}</h1> */}
                        <div className="feed-user">{post.userid?.username || "Anonymous"}</div>
                        <p className="feed-content">{post.content}</p>

                        {/* Post Actions */}
                        <div className="feed-actions">
                            <button className="feed-action-btn" onClick={()=>handleLike(post._id)}>🧡 {post.likeunlike} {post.likes.length} </button>
                            <button className="feed-action-btn">💬 Comment</button>
                            <button className="feed-action-btn">🔁 Share</button>
                        </div>

                        <span  className="feed-time a">Posted on: {new Date(post.createdAt).toLocaleString()}</span>
                    </div>
                ))
            )}
        </div>
    );
};
 
export default FeedPage;
