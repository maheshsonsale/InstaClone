import axios from 'axios'
import { useState, useEffect } from 'react'

import '../css/SearchPage.css'
function SearchPage() {
    const [search, setSearch] = useState('')
    const [profiles, setProfiles] = useState([])

    useEffect(() => {
        if (search.trim() !== '') {
            serchHandler();
        } else {
            setProfiles([]); // Clear if input is empty
        }

    },400)
    function serchHandler() {
        axios.post("http://localhost:5000/search", { search: search }, { withCredentials: true }).then((res) => {
            setProfiles(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }
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
                            <h3>{profile.fullname}</h3>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchPage