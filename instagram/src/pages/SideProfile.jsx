import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/SideProfile.css';

import axios from 'axios';
const SideProfile = () => {
    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [otherUsers, setOtherUsers] = useState([])
    // let otherUserfullname
    // let otherUsername

    useEffect(() => {

        async function sideprofile() {

            try {
                const response = await axios.get('http://localhost:5000/sideprofile', { withCredentials: true })
                setUsername(response.data.username)
                setFullname(response.data.fullname)
                setOtherUsers(response.data.otherUsers)

            } catch (error) {
                console.log(error);
            }
        }

        sideprofile()
    }, [])

    return (
        <aside className="side-profile">
            <div className="profile-top">
                <div style={{ display: 'flex', gap: '10px' }}>
                    <img
                        src="https://i.pravatar.cc/150?img=12"
                        alt="User"
                        className="profile-pic"
                    />
                    <div>
                        <h2 className="username">{username}</h2>
                        <p id='fullname'>{fullname}</p>
                    </div>
                </div>
                <h6 className='switch-btn'>Switch</h6>
            </div>


            {/* Other users */}

            <div className='other-profiles'>
                <div className='suggested-all' >
                    <span>Suggested for you</span>
                    <span>See All</span>
                </div>
                {otherUsers.map((value) => (
                    <div key={value._id}>
                        <div className="profile-top">
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <img
                                    src="https://i.pravatar.cc/150?img=12"
                                    alt="User"
                                    className="profile-pic"
                                />
                                <div>
                                    <h2 className="username">{value.username}</h2>
                                    <p id='fullname'>{value.fullname}</p>
                                </div>
                            </div>
                            <h6 className='switch-btn'>Follow</h6>
                        </div>
                    </div>
                ))}
            </div>

        </aside>
    );
};

export default SideProfile;
