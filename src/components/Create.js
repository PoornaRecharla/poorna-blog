import React, { useState } from "react";
import { doc, addDoc, collection, serverTimestamp, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    const postsCollectionRef = collection(db, "posts");

    const createPost = async () => {
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
        const post = await addDoc(postsCollectionRef, {
        })
        await setDoc(doc(db, "posts", post.id), {
            id: post.id,
            title,
            body,
            author : { name: auth.currentUser.displayName, id: auth.currentUser.uid },
            timestamp: serverTimestamp(),
            tags
        })
        navigate("/");
    };

    onAuthStateChanged(auth, (currentUser) => {
        if (!currentUser) {
            alert("Please login to create a post");
            navigate('/')
        }
    })


    return ( 
        <div className="create">
            <h2>Add a New Post</h2>
                <label>Post Title</label>
                <input 
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Post Body:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <label>Tags:</label>
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value.split(','))}
                />
                <button onClick={createPost} >Add Post</button>
        </div>
     );
}
 
export default Create;