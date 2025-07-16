import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/FeedPage.css';
//************************************************************************************************************** */
const FeedPage = () => {
    const [posts, setPosts] = useState([]);
    const [activeCommentPostId, setActiveCommentPostId] = useState(null); // for comment button toggle
    const [comments, setComments] = useState({});  // this will store comment data as obj
    //*******************************************************************************************************************
    // fetching  all posts of all users from mongodb
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/allposts', {
                    withCredentials: true,
                });
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    });
    // *******************************************like handler function****************************************
    function handleLike(postid) {
        axios.put('http://localhost:5000/likes', { postid }, { withCredentials: true, }).then().catch((err) => {
            console.error('Error fetching posts:', err);
        })
    }
    //********************************** comment input toggler*************************************

    const handleCommentClick = (postId) => {
        setActiveCommentPostId(prevId => (prevId === postId ? null : postId));
    };
    //**********************  when typing in comment box data will be store here as object *****************************
    const handleCommentChange = (postid, value) => {
        setComments((prev) => ({ ...prev, [postid]: value }));
    };

    // *********************************post the  comment in *****************************
    function postcomment(postid) {
        axios.post('http://localhost:5000/comments', { postid: postid, comments: comments[postid] }, {
            withCredentials: true,
        })
        setComments((prev) => ({ ...prev, [postid]: "" }))
    }
    //******************************************** JSX ****************************************************** */
    return (
        <div className="feed-container">
            <h2 className="feed-header">📸 All Posts</h2>
            {posts.length === 0 ? (   // checking for post has or not 
                <p className="no-posts">No posts available</p>
            ) : (
                posts.map((post) => (
                    <div className="post-card" key={post._id}>
                        <div className="post-header">
                            <div className='post-pic-name'>
                                <img src={post.userid?.pic || `https://avatars.dicebear.com/api/identicon/${Math.random().toString(36).substring(7)}.svg`} alt="User"
                                    className="post-profile-pic" />
                                <span className="post-username">{post.userid?.username || "Anonymous"}</span>
                            </div>
                            <span className="post-time">{new Date(post.createdAt).toLocaleString()}</span>
                        </div>
                        {post.image && (
                            <img
                                src={post.image}
                                alt="Image"
                                style={{ width: "100%", height: "500px", borderRadius: "10px", margin: "10px 0" }} />
                        )}
                        <div className="post-content">{post.content}</div>
                        <div className="post-actions">
                            <div className='left-btn'>  {/* like button section */}
                                <button className="action-btn" onClick={() => handleLike(post._id)}>
                                    🧡 {post.likeunlike} {post.likes.length}
                                </button>
                            </div>
                            <div className='middle-btn'>
                                <button className="action-btn" onClick={() => handleCommentClick(post._id)}>
                                    💬 {activeCommentPostId === post._id ? 'Hide Comments' : 'Show Comments'}
                                </button>
                            </div>
                        </div>
                        {activeCommentPostId === post._id && (
                            <div className='comment-list'>
                                {(post.commentids || []).map((comment) => (
                                    <div className="comment" key={comment._id}>
                                        <img className="comment-profilepic" src={post.userid?.pic || `https://avatars.dicebear.com/api/identicon/${Math.random().toString(36).substring(7)}.svg`} alt="User"
                                             />
                                        <span className="post-username">{post.userid?.username || "Anonymous"}</span>
                                        <p>{comment.comments}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        <input
                            type="text"
                            className="comment-input"
                            placeholder="Add a comment"
                            value={comments[post._id] || ''}
                            onChange={(e) => handleCommentChange(post._id, e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') postcomment(post._id);
                            }} />
                    </div>
                ))
            )}
        </div>
    );
    ;
};
export default FeedPage;