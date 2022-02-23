import React, { useState,useEffect } from 'react';

function User() {

    const [user, setUser] = useState("");

    useEffect(() => {
        console.log(user)
    })

    function handleInput(event) {
        setUser(event.target.value)
    }
    
    function handleSubmit(event) {
        fetch('http://localhost:3001/auth', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user
            })
        })
            .then(data => data.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))

        event.preventDefault();
    }

    return (
        <div>
            <label htmlFor='user'> User Email</label> <br />
            <form onSubmit={ handleSubmit }>
                <input type='text' id='user' value={user} name='user' onChange={ handleInput } required/><br />
                <input type='submit' value="SEND" />
            </form>
        </div>
        );
}

export default User;