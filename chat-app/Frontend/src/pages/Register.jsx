import axios from 'axios'
import React, { useState } from 'react';
import '../css/Register.css';
import { Link } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pic, setPic] = useState('')

  async function imageHandler(e) {
    const file = e.target.files[0];

    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "chat-app")

    try {
      const cloudImg = await axios.post("https://api.cloudinary.com/v1_1/dzmmp468g/image/upload", data)
      setPic(cloudImg.data.secure_url)
    } catch (error) {
      console.log("error while uploading image", error);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/register", { name: name, email: email, password: password, pic: pic }).then((res) => {
      console.log("everything working",res);
    }).catch((error) => {
      console.log("mahesh",error);
    })
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2 className="login-title">Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="login-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Profile Picture Upload */}
        <label className="upload-label">
          Upload Profile Picture
          <input
            type="file"
            name="pic"
            accept="image/*"
            className="upload-input"
            onChange={imageHandler}
          />
        </label>
        <button type="submit" className="login-button">Register</button>

        <div className="register-link">
          <span>Already have an account?</span>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
