import React, { useState } from "react";
import axios from "axios";
import "../css/CreatePost.css"; // Optional for styling

function CreatePost() {
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
//************************************************************************************************ */
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("🚀 Form submitted");
        if (!content.trim()) {
            setMessage("Post content cannot be empty.");
            return;
        }
        setMessage("")
        try {
            console.log("📡 Sending POST request...");

            axios.post("http://localhost:5000/createpost", { content, }, { withCredentials: true });
            console.log("✅ Post created:");

            setMessage("✅ Post created successfully!");
            setContent("")
        } catch (error) {
            console.error("Post creation failed:", error);
            setMessage("❌ Failed to create post.");
        }
    };

    return (
        <div className="create-post-container">
            <h2>📝  Create a New Post</h2>
            <form onSubmit={handleSubmit} className="post-form">
                <textarea
                    placeholder="What are you thinking....."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="5"
                ></textarea>
                <button type="submit">Post</button>
            </form>
            <p className="message">{message}</p>
        </div>
    );
}

export default CreatePost;
