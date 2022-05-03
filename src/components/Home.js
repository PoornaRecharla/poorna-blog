import { getDocs, collection, query, orderBy, limit, where, startAfter, endBefore, startAt, endAt } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Post from "./Post";

const Home = () => {

    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [publishedPosts, setPublishedPosts] = useState([]);
    const [postCount, setPostCount] = useState(0);
    const [postsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [lastVisible, setLastVisible] = useState(null);
    const [firstVisible, setFirstVisible] = useState(null);

    const metaData = async () => {
        await getDocs(collection(db, "metaData")).then(
            res => {
                setPublishedPosts(res.docs[0].data().publishedPosts.reverse());
                setPostCount(res.docs[0].data().publishedPosts.length);
            }
        );
    }

    const getPosts = async () => {
        const posts = await getDocs(
            query(
                collection(db, 'posts'),
                where("published", "==", true),
                orderBy("postNum", "desc"),
                limit(postsPerPage),
            )
        ).then(
            res => res.docs.map(
                doc => doc.data()
            )
        );
        setPosts(posts)
        setLastVisible(posts[posts.length - 1].postNum);
    }   


    const getPage = async (page) => {
        console.log(publishedPosts[page * postsPerPage - 1])
        const posts = await getDocs(
            query(
                collection(db, 'posts'),
                where("published", "==", true),
                orderBy("postNum", "desc"),
                limit(postsPerPage),
                startAt(publishedPosts[page * postsPerPage - 1])
            )
        ).then(
            res => res.docs.map(
                doc => doc.data()
            )
        );
        setPosts(posts)
    }


    useEffect(async () => {
        metaData();
        getPosts();
    }, [])

    return (
        <div className="home">
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
            <div className="pagination">
                <button
                    className="pagination-button"
                    {...(page === 1? { disabled: true } : {})}
                    onClick={() => {
                        if (page > 1) {
                            setPage(page - 1);
                            console.log('page', page)
                            // getPreviousPage()
                            getPage(page)
                        }
                    }}
                >
                    Previous
                </button>

                <p> {page} </p>
                <button
                    className="pagination-button"
                    {...(page === Math.ceil(postCount / postsPerPage)? { disabled: true } : {})}
                    onClick={() => {
                        if (page < Math.ceil(postCount / postsPerPage)) {
                            setPage(page + 1)
                            console.log('page', page)
                            // getNextPage()
                            getPage(page)
                        }
                    }}
                >
                    Next
                </button>
            </div>
            <div className="post-count">
                <p>{postCount} posts</p>
            </div>
            <div className="pages-count">
                <p>{Math.ceil(postCount / postsPerPage)} pages</p>
            </div>
        </div>
    );
}

export default Home;