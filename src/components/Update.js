import React, { useState } from 'react'
import { auth } from '../firebase-config'
import { updateProfile, updateEmail, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Update() {

    const navigate = useNavigate()

    const [user, setUser] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = React.useState('')
    const [error, setError] = React.useState('')

    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setUser(currentUser)
        } else {
            navigate(-1)
        }
    })

    const changeName = () => {
        updateProfile(auth.currentUser, {
            displayName: name
        }).then(() => {
            setError('')
            alert('Name changed successfully')
            navigate('/profile')
        }).catch(error => {
            setError(error.message)
            console.log(error.message)
        })
    }

    const changeEmail = () => {
        updateEmail(auth.currentUser, email).then(() => {
            setError('')
            alert('Email changed successfully')
            navigate('/profile')
        }).catch(error => {
            setError(error.message)
        })
    }

    const changePassword = () => {
        sendPasswordResetEmail(auth, user.email).then(() => {
            setError('')
            alert('Please check your email for a password reset link')
        }).catch(error => {
            setError(error.message)
        })
    }

    return (
        <div>
            <h1>Update</h1>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
                <button onClick={changeName}>Update Name</button>
            </div>
            <div>
                <label>Email:</label>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                <button onClick={changeEmail}>Update Email</button>
            </div>
            <div>
                <button onClick={changePassword}>Update Password</button>
            </div>
            <div>                
                {error ? <label>Error:</label> : null}
            </div>
        </div>
    )
}

export default Update