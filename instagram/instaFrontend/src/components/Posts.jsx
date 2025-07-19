// import { useEffect } from 'react';
import '../css/Posts.css'
import React from 'react'
function Posts({
     posts,
    activeCommentPostId,
    comments,
    renderOtherUser,
    handleLike,
    handleCommentClick,
    handleCommentChange,
    postcomment,
}) {
    // useEffect(()=>{
        console.log(posts);
    // },[posts])


    return (
        <div>
            <div className="feed-container">
                
                {posts?.length === 0 ? (   // checking for post has or not 
                    <p className="no-posts">No posts available</p>
                ) : (
                    posts?.map((post) => (
                        <div className="post-card" key={post._id}>
                            <div className="post-header">
                                <div className='post-pic-name' onClick={() => { renderOtherUser(post?.userid) }}>
                                    <img src={post?.userid?.pic || `https://avatars.dicebear.com/api/identicon/${Math.random().toString(36).substring(7)}.svg`} alt="User"
                                        className="post-profile-pic" />
                                    <span className="post-username">{post.userid?.username || "Anonymous"}</span>
                                </div>
                                <span className="post-time">{new Date(post.createdAt).toLocaleString()}</span>
                            </div>
                            {post.image && (
                                <img src={post.image} alt="Image"
                                    style={{ width: "100%", height: "480px", borderRadius: "10px", margin: "5px 0" }} />
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
                                        💬 {activeCommentPostId === post._id ? 'Hide ' : 'View all'} {post?.commentids.length} Comments</button>
                                </div>
                            </div>
                            {activeCommentPostId === post._id && (
                                <div className='comment-list'>
                                    {(post.commentids || []).map((comment) => (
                                        <div className="comment" key={comment._id} onClick={() => { renderOtherUser(comment?.sender) }}>
                                            <img className="comment-profilepic" src={comment?.sender?.pic || `https://avatars.dicebear.com/api/identicon/${Math.random().toString(36).substring(7)}.svg`} alt="User"
                                            />
                                            <span className="post-username">{comment?.sender?.username || "Anonymous"}</span>
                                            <p>{comment.comments}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <input type="text" className="comment-input" placeholder="Add a comment" value={comments[post._id] || ''}
                                onChange={(e) => handleCommentChange(post._id, e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') postcomment(post._id);
                                }} />
                        </div>
                    ))
                )}
            </div>
            
        </div>
    )
}

export default Posts