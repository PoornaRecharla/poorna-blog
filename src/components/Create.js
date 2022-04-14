import React, { useEffect, useState } from "react";
import { doc, addDoc, collection, serverTimestamp, setDoc, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { Phone } from "@material-ui/icons";

const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useState('');

    const postsCollectionRef = collection(db, "posts");

    const createPost = async (e) => {
        e.preventDefault();
        if (!title || !body) {
            if (!title && !body) {
                alert('Please enter title and body');
            }
            else if (!body) {
                alert('Please enter body');
            } else
                alert('Please enter title');
            return;
        }
        const post = await addDoc(postsCollectionRef, {})
        await setDoc(doc(db, "posts", post.id), {
            id: post.id,
            title,
            body,
            author: { name: auth.currentUser.displayName, id: auth.currentUser.uid, photoURL: auth.currentUser.photoURL },
            timestamp: serverTimestamp(),
            deleted: false,
            tags
        })

        await setDoc(doc(db, "postsList", post.id), {
            id: post.id,
            title,
            body: body.length > 100 ? body.substring(0, 100) + '...' : body.length,
            author: {
                name: auth.currentUser.displayName,
                id: auth.currentUser.uid,
                photoURL: auth.currentUser.photoURL ? auth.currentUser.photoURL : 'https://firebasestorage.googleapis.com/v0/b/react-blog-c7f0f.appspot.com/o/default-user-image.png?alt=media&token=f9f8f8e0-f8f8-4f8f-8f8f-f8f8f8f8f8f8'
            },
            timestamp: serverTimestamp(),
            deleted: false,
            tags
        })
        console.log(post);
        navigate("/");
    };

    onAuthStateChanged(auth, (currentUser) => {
        if (!currentUser) {
            alert("Please login to create a post");
            navigate('/')
        } else {
            getDocs(doc(db, "users", currentUser.uid), (user) => {
                setUser(user);
            })
            console.log(user);
        }
    })


    return (
        <div className="create">
            <h2>Add a New Post</h2>
            <form onSubmit={createPost}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input required type="text" className="form-control" id="title" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="body">Body</label>
                    <textarea className="form-control" id="body" rows="3" placeholder="Enter body" value={body} onChange={(e) => {setBody(e.target.value); e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px';}}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="tags">Tags</label>
                    <input type="text" className="form-control" id="tags" placeholder="Enter tags" value={tags} onChange={(e) => setTags(e.target.value.split(','))} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Create;