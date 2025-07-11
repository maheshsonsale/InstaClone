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
    const [messege,setMessege]=useState('')

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:5000/login',{email,password},{withCredentials:true}).then(()=>{
                    setMessege("Login Success")
                    navigate('/home')
                }).catch(()=>{
                    setMessege("Something went wrong")
                })
        } catch (error) {
            console.log(error.response.data.message);
        }

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
                <p className='message'>{messege}</p>
            </div>
        </div>
    );
};

export default Login;
