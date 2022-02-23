import React, { useState,useEffect } from 'react';

function Chat() {

    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState();

    useEffect(() => {
        // Make connection
        setSocket(new WebSocket('ws://localhost:3003'));
    },[])

    //Watch out for messages
   socket && socket.addEventListener('message', function (event) {
        console.log(event.data);
    });

    function handleInput(event) {
        setText(event.target.value);
    }

    function handleMessage(event) {
        socket && socket.send(text)
    }

    const display = messages.map((message, index) => {
        
    });

    return (
        <div>
            <label htmlFor='text'>Message</label><br />
            <input type='text' id='text' name='text' value={text} onChange={handleInput} /> <br/>
            <button name="send" id="send" onClick={handleMessage} > SEND </button>
        </div>
    );
}

export default Chat;