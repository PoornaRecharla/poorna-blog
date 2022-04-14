import React, { useState } from 'react'
import { auth, storage, db } from '../firebase-config'
import { updateProfile, updateEmail, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { getDoc, getDocs, setDocs, setDoc, doc, updateDoc } from 'firebase/firestore'
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";

function Update() {

    const navigate = useNavigate()

    const [user, setUser] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [error, setError] = useState('')

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
        }).then(async () => {
            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                name: name
            })
            setError('')
            alert('Name changed successfully')
            navigate(`/profile/${user.uid}`)
        }).catch(error => {
            setError(error.message)
            console.log(error.message)
        })
    }

    const changeEmail = async () => {
        updateEmail(auth.currentUser, email).then(async () => {
            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                email: email
            })
            setError('')
            alert('Email changed successfully')
            navigate(`/profile/${user.uid}`)
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

    const changeImage = async () => {
        // const file = image
        // const storageRef = ref(storage, 'images/yay.jpg')
        const imageRef = ref(storage, `Profile Photos/${image.name}`);
        console.log(image)
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageURL(url)
                updateProfile(auth.currentUser, {
                    photoURL: url
                }).then(async () => {
                    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                        photoURL: url
                    })
                    setError('')
                    alert('Image changed successfully')
                    navigate(`/profile/${user.uid}`)
                }).catch(error => {
                    setError(error.message)
                })
            })
        })
    }
    
    
    //     uploadBytes(storageRef, file).then((snapshot) => {
    //         getDownloadURL(snapshot).then((url) => {
    //             setImageURL(url)
    //             updateProfile(auth.currentUser, {
    //                 photoURL: url
    //             }).then(() => {
    //                 setError('')
    //                 alert('Image changed successfully')
    //                 navigate('/profile')
    //             }).catch(error => {
    //                 setError(error.message)
    //             })
    //         })
    //     })
    // }




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
                <label>Image:</label>
                <input type="file" onChange={e => setImage(e.target.files[0])} />
                <button onClick={changeImage}>Update Image</button>
            </div>
            <div>
                {error ? <label>Error:</label> : null}
            </div>
        </div>
    )
}

export default Update