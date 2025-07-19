import axios from 'axios'
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../css/ProfilePage.css';
import { BackPath } from '../components/BackendPath';

const OtherPerson = () => {
    const location = useLocation()
    const userid = location.state?.userdata._id;// receving user detail from side profile 
    
    const [user,setUser]=useState('')


    useEffect(() => {
        axios.post(`${BackPath}/otherPerson`,{userid:userid},{withCredentials:true}).then((res)=>{
            setUser(res.data)            
        })
    })

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
                        <h2 style={{cursor:'pointer'}}>⋯</h2>

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

                {user?.postids?.length === 0 ? (
                    <p className="no-posts">No Post Yet....</p>
                ) : (
                    <div className="posts-list">
                        {user?.postids?.map((post) => (
                            <div key={post._id} className="post-card">
                                <p className="post-content">{post?.content}</p>
                                <small className="post-meta">Posted on: {new Date(post?.createdAt).toLocaleString()}</small>
                            </div>
                        ))}
                    </div>
                )} 
            </div>
        </div>
    );
};

export default OtherPerson;
