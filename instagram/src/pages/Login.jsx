import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import HomePage from './HomePage';
import axios from 'axios';
import '../css/Login.css';

const Login = () => {
    const navigate=useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            
            const response=await axios.post('http://localhost:5000/find',{email,password},{withCredentials:true})
            // console.log('Login Data:', response.data);
            if (response.data) {
                navigate('/home')
            }
        } catch (error) {
            console.log(error);
            
        }
        setEmail('')
        setPassword('')
    };

    return (
        <div className="insta-login-wrapper">
            <div className="insta-login-box">
                <h1 className="insta-logo">Instagram</h1>
                <form onSubmit={handleLogin} className="insta-form">
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

                    <button type="submit">Log in</button>
                </form>

                <p className="insta-login-link">
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
