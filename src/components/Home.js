import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";

const Home = () => {

    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        const posts = await getDocs(collection(db, 'posts')).then(res => res.docs.map(doc => doc.data()));
        setPosts(posts)
    }


    useEffect(() => {
        getPosts()
    }, [])

    // eslint-disable-next-line
    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
    };

    return (
        <div className="home">
            {posts.map((post) => {
                return (
                    <Link to={`/blogs/${post.id}`} className="post">
                        <div className="postHeader">
                            <div className="title">
                                <h1> {post.title}</h1>
                                {/* {JSON.stringify(post)} */}
                            </div>
                            {/* <div className="deletePost">
                                {isAuth && post.author.id === auth.currentUser.uid && (
                                    <button
                                        onClick={() => {
                                            deletePost(post.id);
                                        }}
                                    >
                                        {" "}
                                        &#128465;
                                    </button>
                                )}
                            </div> */}
                        </div>
                        <div className="postTextContainer"> {post.postText} </div>
                        <h3>@{post.author.name}</h3>
                    </Link>
                );
            })}
        </div>
    );
}

export default Home;