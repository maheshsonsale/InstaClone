import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/FeedPage.css';


const FeedPage = () => {

    const [posts, setPosts] = useState([]);

    const [visibleInputs, setVisibleInputs] = useState({}); // for comment button toggle
    const [comments, setComments] = useState({});  // this will store comment data as obj

    //***************************************************************************************************************************************** */
    // geeting all posts of all users from mongodb
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

    //****************************************************************************************************************** */
    // ************************************like handler function****************************
    async function handleLike(postid) {
        try {
            await axios.put('http://localhost:5000/likes', { postid }, {
                withCredentials: true,
            });

        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }
    //**************************************************************************************************************************** */
    //**************************** */ comment input toggler*****************************

    const handleCommentClick = (postid) => {
        setVisibleInputs((prev) => ({ ...prev, [postid]: true }));

    };
    // *****************************blur to hide input******************************
    const handleBlur = (postid) => {
        // if (!comments[postid] || comments[postid].trim() === '') {
        setVisibleInputs((prev) => ({ ...prev, [postid]: false }));
        // }
    };


    const handleCommentChange = (postid, value) => {
        setComments((prev) => ({ ...prev, [postid]: value }));
    };


    // ********************post comment*****************************
    async function postcomment(postid) {
        console.log("hello");
        // console.log(postid, comments);
        try {
            await axios.post('http://localhost:5000/comments', { postid, comments: comments[postid] }, {
                withCredentials: true,
            });

        } catch (error) {
            console.error('Error fetching posts:', error);
        }
        setComments((prev) => ({ ...prev, [postid]: '' }))
        setVisibleInputs((prev) => ({ ...prev, [postid]: false }))
    }


    return (
        <div className="feed-container">
            <h2 className="feed-title">📸 All Posts</h2>
            {/* ******************** fetching all the post ******************** */}
            {posts.length === 0 ? (
                <p>No posts available</p>
            ) : (
                posts.map((post) => (

                    <div className="feed-post" key={post._id}>
                        {/* <h1>{post._id}</h1> */}
                        <div className="feed-user">{post.userid?.username || "Anonymous"}</div>
                        <p className="feed-content">{post.content}</p>


                        <div className="feed-actions">
                            <button className="feed-action-btn" onClick={() => handleLike(post._id)}>🧡 {post.likeunlike} {post.likes.length} </button>


{/* **************************************toggle comment button***************************** */}
                            {!visibleInputs[post._id] ? (
                                <button className="feed-action-btn" onClick={() => handleCommentClick(post._id)}>💬 Comment</button>
                            ) : (
                                <div className="feed-comment-box">
                                    <input
                                        type="text"
                                        name={`comment-${post._id}`}
                                        id={`comment-${post._id}`}
                                        placeholder="Add a comment"
                                        value={comments[post._id] || ''}
                                        autoFocus
                                        onBlur={() => handleBlur(post._id)}
                                        onChange={(e) => handleCommentChange(post._id, e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') postcomment(post._id);
                                        }}
                                    />

                                    {/* <button onClick={() => postcomment(post._id)}>Post</button> */}
                                </div>

                            )}


                            <button className="feed-action-btn">🔁 Share</button>
                        </div>

                        <span className="feed-time a">Posted on: {new Date(post.createdAt).toLocaleString()}</span>
                    </div>
                ))
            )}
        </div>
    );
};

export default FeedPage;
