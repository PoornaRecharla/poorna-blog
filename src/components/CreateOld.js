import React, { useEffect, useState } from "react";
import { doc, addDoc, collection, serverTimestamp, setDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from 'react-router-dom';
import { Phone } from "@material-ui/icons";

const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

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
            timestamp: serverTimestamp(),
            deleted: false,
            tags
        })

        await setDoc(doc(db, "postsList", post.id), {
            id: post.id,
            title,
            body: body.length > 100 ? body.substring(0, 100) + '...' : body.length,
            timestamp: serverTimestamp(),
            deleted: false,
            tags
        })
        console.log(post);
        navigate("/");
    };

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