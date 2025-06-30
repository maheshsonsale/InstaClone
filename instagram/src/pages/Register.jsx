import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import '../css/Register.css';


const Register = () => {

    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
try {
    await axios.post('http://localhost:5000/create', { fullname, username, email, password })
} catch (error) {
console.log(error);

}
        // Add your backend registration logic here
    };

    return (
        <div className="insta-register-wrapper">
            <div className="insta-register-box">
                <h1 className="insta-logo">Instagram</h1>
                <form onSubmit={handleSubmit} className="insta-form">
                    <input
                        type="text"
                        name="fullname"
                        placeholder="Full Name"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Sign up</button>
                </form>

                <p className="insta-login-link">
                    Have an account? <Link to="/">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
