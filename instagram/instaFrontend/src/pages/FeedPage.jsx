import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/FeedPage.css';


const FeedPage = () => {

    const [posts, setPosts] = useState([]);

    const [visibleInputs, setVisibleInputs] = useState({}); // for comment button toggle
    const [comments, setComments] = useState({});  // this will store comment data as obj
    const [allComments, setAllComments] = useState([])
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
    });  // by calling only one when file loads

    // *******************************************like handler function****************************************
    function handleLike(postid) {
        axios.put('http://localhost:5000/likes', { postid }, { withCredentials: true, }).then().catch((err) => {
            console.error('Error fetching posts:', err);
        })
    }
    //********************************** comment input toggler*************************************

    const handleCommentClick = (postid) => {
        setVisibleInputs((prev) => ({ ...prev, [postid]: true }))
    };

    // *****************************blur to hide input******************************
    const handleBlur = (postid) => {
        setVisibleInputs((prev) => ({ ...prev, [postid]: false }));
    };

    //****************************  when typing in comment box data will be store here as object *****************************
    const handleCommentChange = (postid, value) => {
        setComments((prev) => ({ ...prev, [postid]: value }));
    };

    // *********************************post the  comment in *****************************
    function postcomment(postid) {
        axios.post('http://localhost:5000/comments', { postid, comments: comments[postid] }, {
            withCredentials: true,
        }).then(() => {
            setComments((prev) => ({ ...prev, [postid]: '' }))
            setVisibleInputs((prev) => ({ ...prev, [postid]: false }))
        }).catch((error) => {
            console.error('Error fetching posts:', error);
        })
    }
    // ***********************************  all post comment load here **************************************************
    function loadAllComments(postid) {
        axios.post('http://localhost:5000/loadAllComments', { postid }, { withCredentials: true }).then((res) => {
            console.log(res.data);
            setAllComments(res.data)
        }).catch((err) => {
            console.log(err);
        })
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
                            <span className="post-username">{post.userid?.username || "Anonymous"}</span>
                            <span className="post-time">{new Date(post.createdAt).toLocaleString()}</span>
                        </div>
                        {post.image && (
                            <img
                                src={post.image}
                                alt="Post"
                                style={{
                                    width: "100%",
                                    height: "500px",
                                    borderRadius: "10px",
                                    margin: "10px 0"
                                }}
                            />
                        )}

                        <div className="post-actions">
                            <div className='left-btn'>  {/* like button section */}
                                <button className="action-btn" onClick={() => handleLike(post._id)}>
                                    🧡 {post.likeunlike} {post.likes.length}
                                </button>
                            </div>
                            <div className='middle-btn'> {/* Comment button section*/}
                                {!visibleInputs[post._id] ? (
                                    <button className="action-btn" onClick={() => {
                                        handleCommentClick(post._id);
                                        loadAllComments(post._id);
                                    }}>
                                        💬 Comment
                                    </button>
                                ) : (
                                    <div className="comment-section">
                                        <input // after click on comment button input box will display
                                            type="text"
                                            className="comment-input"
                                            placeholder="Add a comment"
                                            value={comments[post._id] || ''}
                                            onChange={(e) => handleCommentChange(post._id, e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') postcomment(post._id);
                                            }}
                                            onBlur={() => handleBlur(post._id)}
                                            autoFocus
                                        />
                                        <div className="comment-list">
                                            {(allComments || []).map((comment) => (
                                                <div className="comment" key={comment._id}>
                                                    <h2>{comment.username}</h2>
                                                    <span>{comment.comments}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className='right-btn'>  {/* share button  */}
                                <button className="action-btn">🔁 Share</button>
                            </div>
                        </div>
                        
                        <div className="post-content">{post.content}</div>
                    </div>
                ))
            )}
        </div>
    );
    ;
};

export default FeedPage;
