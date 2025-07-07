import React from 'react'
import { useEffect } from 'react';
import axios from 'axios'
function ChatPage() {

    const fetchChats = () => {
        axios.get('/api/chat').then((res) => {
            console.log("working", res);

        }).catch((err) => {
            console.log(err);

        })
    }
    useEffect(() => {
        fetchChats()
    }, [])

    return (
        <div>ChatPage</div>
    )
}

export default ChatPage