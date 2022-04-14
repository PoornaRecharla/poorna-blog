import React, { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { auth, logout } from '../firebase-config';

function Profile(id) {
    const {id : userId} = useParams();
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [photoURL, setPhotoURL] = useState("")

    const getUser = async () => {
        await getDoc(doc(db, "users", userId)).then(doc => {
            setName(doc.data().name)
            setEmail(doc.data().email)
            setPhotoURL(doc.data().photoURL)
        })
    }

    onAuthStateChanged(auth, (currentUser) => {
        if(currentUser && currentUser.uid === userId) {
            // getUser()
            setName(currentUser.displayName)
            setEmail(currentUser.email)
            if(currentUser.photoURL) {
                setPhotoURL(currentUser.photoURL)
            } else {
                setPhotoURL('https://www.w3schools.com/howto/img_avatar.png')
            }
        } else {
            getUser()
            // navigate(-1)

        }
    })

    // useEffect(() => {
    //     getUser()
    // }, [])

    return (
        <div id='profile'>
            <div className="title">
                <h1>Profile</h1>
            </div>
            <div className="body">
                <div className="profile-info">
                    <div className="profile-info-left">
                        <div className="profile-info-left-top">
                            <div className="profile-info-left-top-left">
                                <h1>{name}</h1>
                                <h2>{email}</h2>
                            </div>
                            <div className="profile-info-left-top-right">
                                <img src={photoURL} alt="profile" className='profilePic' />
                            </div>
                        </div>
                        <div className="profile-info-left-bottom">
                            <div className="profile-info-left-bottom-left">
                                <h1>Posts</h1>
                                <h2>0</h2>
                            </div>
                            <div className="profile-info-left-bottom-right">
                                <h1>Followers</h1>
                                <h2>0</h2>
                            </div>
                        </div>
                    </div>
                    <div className="profile-info-right">
                        <div className="profile-info-right-top">
                            <h1>About</h1>
                            <h2></h2>
                        </div>
                        <div className="profile-info-right-bottom">
                            <h1>Bio</h1>
                            <h2></h2>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="footer">
                <button
                    onClick={() => {
                        navigate(-1);
                    }}
                    id="cancelBtn"
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        navigate(-1);
                    }}
                    id="loginBtn"
                >
                    Logout
                </button>
            </div> */}
            <Link to='/update-profile'>Update Profile</Link>
        </div>
    )
}

export default Profile
