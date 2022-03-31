// import { useParams, useNavigate } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../firebase-config';
// import { useEffect } from 'react';

// const PostDetails = () => {
//     const { id } = useParams();



//     useEffect(async () => {
//         const data = await getDoc(doc(db, 'posts', id)).then(res => {
//             localStorage.setItem('post', JSON.stringify(res.data()));
//         })
//     }, [])


//     const navigate = useNavigate();
//     return (
//         <div className="blog-details">
//             <article >
//                 <h1>Post Details</h1>
//                 <br />
//                 <h2>{JSON.parse(localStorage.getItem('post')).title}</h2>
//                 <p> Written by {JSON.parse(localStorage.getItem('post')).author.name}</p>
//                 <br />
//                 <p>{JSON.parse(localStorage.getItem('post')).body}</p>
//                 <br />
//                 <button onClick={() => navigate(-1)}>Back</button>
//             </article>
//         </div>
//     );
// }

// export default PostDetails;




import { getDocs, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase-config";

const PostDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        const posts = await getDocs(collection(db, 'posts')).then(res => res.docs.map(doc => doc.data()));
        setPosts(posts)
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div className="blog-details">
            {posts.map((post) => {
                if (post.id === id) {
                    return (
                        <article>
                            <h1>Post Details</h1>
                            <br />
                            <h2>{post.title}</h2>
                            <p>Written by {post.author.name}</p>
                            <br />
                            <p>{post.body}</p>
                            <br />
                            <button onClick={() => navigate(-1)}>Back</button>
                        </article>
                    );
                }
            })}
        </div>
    );
}

export default PostDetails;