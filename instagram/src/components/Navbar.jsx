import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../css/Navbar.css";
import axios from "axios";

const Navbar = () => {
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await axios.get("http://localhost:5000/logout", { withCredentials: true });
            console.log("Logged out successfully");
            navigate("/");
        } catch (error) {
            console.log("Logout error:", error);
        }
    }

    return (
        <nav className="navbar">
            <div className="navbar-logo">Instagram</div>
            <ul className="navbar-links">
                <li>
                    <NavLink to="feedpage">🏠 Home</NavLink>
                </li>
                <li>
                    <NavLink to="createpost">🔍 Search</NavLink>
                </li>
                <li>
                    <NavLink to="createpost">🧭 Explore</NavLink>
                </li>
                <li>
                    <NavLink to="createpost">🎞️ Reels</NavLink>
                </li>
                <li>
                    <NavLink to="createpost">💌 Messages</NavLink>
                </li>
                <li>
                    <NavLink to="createpost">🔔 Notifications</NavLink>
                </li>
                <li>
                    <NavLink to="createpost">➕ Create</NavLink>
                </li>
                <li>
                    <NavLink to="profile">👤 Profile</NavLink>
                </li>
                <li>
                    <NavLink to="feedpage">⚙️ More</NavLink>
                </li>
            </ul>
            <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
    );
};

export default Navbar;
