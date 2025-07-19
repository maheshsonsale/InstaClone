import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../css/ProfilePage.css';
import { BackPath } from '../components/BackendPath';
import Posts from '../components/Posts';
const OtherPerson = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const userid = location.state?.userdata._id;// receving user detail from side profile 

    const [user, setUser] = useState('')

    const [posts, setPosts] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState('');
    const [activeCommentPostId, setActiveCommentPostId] = useState(null);
    const [comments, setComments] = useState({});

    useEffect(() => {
        if (!location.state?.userdata) {
            navigate('/home'); // or show a 404 fallback
            return;
        }
    }, [location.state?.userdata, navigate]);


    useEffect(() => {
        axios.post(`${BackPath}/otherPerson`, { userid: userid }, { withCredentials: true }).then((res) => {
            setUser(res.data)
            setPosts(res.data.postids)
        })
    })
    // post section 
    useEffect(() => {
        axios.get(`${BackPath}/allposts`, {
            withCredentials: true,
        }).then((res) => {
            setLoggedInUser(res?.data?.userid)
        }).catch(() => {
            console.error('Error fetching posts:');
        })
    });

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
            navigate(`/home/otherperson/${user?.username}`, {
                state: {
                    userdata: user
                }
            })
        }
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img className="profile-dp" src={user?.pic ? user?.pic : "https://i.pravatar.cc/150?img=10"} alt="Profile" />

                <div className="profile-info">
                    <div className="username-section">
                        <h2>{user.username}</h2>
                        <button className="btn">Follow</button>
                        <button className="btn">Message</button>
                        <button className="btn">🙂➕</button>
                        <h2 style={{ cursor: 'pointer' }}>⋯</h2>

                    </div>

                    <div className="profile-stats">
                        <span><strong>{user?.postids?.length}</strong> posts</span>
                        <span><strong>{user?.followers?.length}</strong> followers</span>
                        <span><strong>{user?.following?.length}</strong> following</span>
                    </div>

                    <div className="bio">

                        <p>{user.bio}</p>

                    </div>
                </div>
            </div>

            <div className="dashboard-container">
                <h2 className="dashboard-title">{user.username}' posts</h2>

                <Posts
                    posts={posts}
                    activeCommentPostId={activeCommentPostId}
                    comments={comments}
                    renderOtherUser={renderOtherUser}
                    handleLike={handleLike}
                    handleCommentClick={handleCommentClick}
                    handleCommentChange={handleCommentChange}
                    postcomment={postcomment}
                />
            </div>
        </div>
    );
};

export default OtherPerson;
