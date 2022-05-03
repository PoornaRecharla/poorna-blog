import { getDocs, collection, query, orderBy, limit, where, startAt} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import Post from "./Post";

const Posts = () => {

    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [postCount, setPostCount] = useState(0);
    const [postsPerPage] = useState(10);

    const getPosts = async (page) => {
        const metaData = await getDocs(collection(db, "metaData"))
        const start = metaData.docs[0].data().publishedPosts.reverse()[page * postsPerPage - postsPerPage]
        setPostCount(metaData.docs[0].data().publishedPosts.length)
        const posts = await getDocs(
            query(
                collection(db, 'posts'),
                where("published", "==", true),
                orderBy("postNum", "desc"),
                limit(postsPerPage),
                startAt(start)
            )
        ).then(
            res => res.docs.map(
                doc => doc.data()
            )
        );
        setPosts(posts)
    }

    useEffect(() => {
        getPosts(page);
    }, [])

    return (
        <>
            <div className="posts">
                {
                    posts.length > 0 ?
                        posts.map(post => {
                            return (
                                <Post
                                    key={post.id}
                                    post={post}
                                />
                            )
                        })
                        :
                        <p>Loading...</p>
                }
            </div>
            {
                postCount > postsPerPage ?
                    <div className="pagination">
                        <button
                            className="pagination-button"
                            {...(page === 1 ? { disabled: true } : {})}
                            onClick={() => {
                                if (page > 1) {
                                    getPosts(page - 1)
                                    setPage(page - 1);
                                }
                            }}
                        >
                            &lt;
                        </button>
                        <div className="pagination-numbers">
                            { 
                                Array.from(Array(Math.ceil(postCount / postsPerPage)).keys()).map(
                                    (num, index) => {
                                        return (
                                            <button
                                                className={`pagination-button ${page === index + 1 ? 'pagination-button-active' : ''}`}
                                                key={index}
                                                onClick={() => {
                                                    getPosts(index + 1)
                                                    setPage(index + 1)
                                                }}
                                            >
                                                {index + 1}
                                            </button>
                                        )
                                    }
                                )
                            }

                            <button
                                className="pagination-button"
                                {...(page === Math.ceil(postCount / postsPerPage) ? { disabled: true } : {})}
                                onClick={() => {
                                    console.log('page', page)
                                    if (page < Math.ceil(postCount / postsPerPage)) {
                                        getPosts(page + 1)
                                        setPage(page + 1)
                                    }
                                }}
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                    : null
            }
        </>
    );
}

export default Posts;