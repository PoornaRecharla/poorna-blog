import React from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Profile() {

    const navigate = useNavigate()

    const [uid, setUid] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUid(user.uid)
            console.log(uid);
            setName(user.displayName)
            setEmail(user.email)
        } else {
            navigate(-1)
        }
    });

    return (
        <div id='profile'>
            <ul style={{ listStyleType: "none" }}>
                <li>Uid: {uid}</li>
                <li>Name: {name}</li>
                <li>Email: {email}</li>
            </ul>
            <Link to='/update-profile'>Update Profile</Link>
        </div>
    )
}

export default Profile