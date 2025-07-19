import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BackPath } from '../components/BackendPath';
import Posts from '../components/Posts';
//************************************************************************************************************** */
const FeedPage = () => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState('')
    const [activeCommentPostId, setActiveCommentPostId] = useState(null); // for comment button toggle
    const [comments, setComments] = useState({});  // this will store comment data as obj
    //*******************************************************************************************************************
    // fetching  all posts of all users from mongodb
    useEffect(() => {
        axios.get(`${BackPath}/allposts`, {
            withCredentials: true,
        }).then((res) => {
            setPosts(res?.data?.modifiedPosts);
            setLoggedInUser(res?.data?.userid)
        }).catch(() => {
            console.error('Error fetching posts:');
        })
    });
    // *******************************************like handler function****************************************
    function handleLike(postid) {
        axios.put(`${BackPath}/likes`, { postid }, { withCredentials: true, }).then().catch((err) => {
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
        axios.post(`${BackPath}/comments`, { postid: postid, comments: comments[postid] }, {
            withCredentials: true,
        })
        setComments((prev) => ({ ...prev, [postid]: "" }))
    }

    function renderOtherUser(user) {
        if (user._id == loggedInUser) {
            navigate('/home/profile')
        } else {
            navigate(`/home/otherperson/:${user?.username}`, {
                state: {
                    userdata: user
                }
            })
        }
    }
    //******************************************** JSX ****************************************************** */
    return (
        <div className='feed-container'>
            <Posts
                posts={posts}
                activeCommentPostId={activeCommentPostId}
                comments={comments}
                renderOtherUser={renderOtherUser}
                handleLike={handleLike}
                handleCommentClick={handleCommentClick}
                handleCommentChange={handleCommentChange}
                postcomment={postcomment} />
        </div>
    )

};
export default FeedPage;