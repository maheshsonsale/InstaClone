import axios from 'axios'
import { useState, useEffect } from 'react'

import '../css/SearchPage.css'
function SearchPage() {
    const [search, setSearch] = useState('')
    const [profiles, setProfiles] = useState([])


    useEffect(() => {
        const serchHandler = () => {
            axios.post("http://localhost:5000/search", { search: search }, { withCredentials: true }).then((res) => {
                setProfiles(res.data);
            }).catch((error) => {
                console.log(error);
            })
        };

        const delayDebounce = setTimeout(() => {
            if (search.trim() !== '') {
                serchHandler();
            } else {
                setProfiles([]); // Clear if input is empty
            }
        }, 500); // delay in ms (500ms = half a second)

        return () => clearTimeout(delayDebounce); // cleanup on next render
    }, [search]);

    
    return (
        <div className='main-container'>
            <div className='search-container'>
                <div className='header'>
                    <h2 style={{ color: 'white' }}>Search</h2>
                    <input className='search-inp' type="text" placeholder='Search' value={search} onChange={(e) => { setSearch(e.target.value) }} />
                    <hr />
                </div>
                <div className='profiles-container'>
                    {profiles && (
                        profiles.map((profile) => (
                            
                            <div key={profile._id} >
                                <img
                                    src={profile.pic ? profile.pic : "https://i.pravatar.cc/150?img=10"}
                                    alt="User"
                                    className="profile-pic"
                                />
                                <div>
                                    <h2 className="username">{profile.username}</h2>
                                    <p id='fullname'>{profile.fullname}</p>
                                </div>
                            </div>
                            
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchPage