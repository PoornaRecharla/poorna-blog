import { getDocs, collection, query, orderBy, limit, where, startAfter, endBefore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Post from "./Post";
import { queries } from "./Firebase-Data";

const Home = () => {

    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [posts1, setPosts1] = useState([]);
    // const [user, setUser] = useState('');
    const [postCount, setPostCount] = useState(0);
    const [postsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [lastVisible, setLastVisible] = useState(null);
    const [firstVisible, setFirstVisible] = useState(null);

    const queryConstraints = {
        // where: {
        where: {
            fieldPath: "deleted",
            opStr: "==",
            value: false
        },
        where: {
            fieldPath: "id",
            opStr: "==",
            value: '00uVN2fRDIxfyUAPTTg0'
        },
        // },
        orderBy: {
            fieldPath: "timeStamp",
            directionStr: "desc"
        },
        limit: postsPerPage
    };

    const getPosts1 = async () => {
        console.log(queryConstraints);
        const posts = await getDocs(collection(db, "postsList"), queryConstraints) //.then(res => { res.docs.map(doc => doc.data()) });
        // console.log("Posts: ", posts.query);
        // setPosts(posts);
        setPosts1(posts.docs.map(doc => doc.data()));
        console.log("Posts: ", posts.docs.map(doc => doc.data()));
        // setPostCount(posts.length);
        // setLastVisible(posts[posts.length - 1].timeStamp);
        // setFirstVisible(posts[0].timeStamp);
    };


    // onAuthStateChanged(auth, (currentUser) => {
    //     if (currentUser) setUser(currentUser);
    //     else setUser('');
    // })

    const getPosts = async () => {
        const posts = await getDocs(
            query(
                collection(db, 'posts'),
                where("deleted", "==", false),
                // where("author.id", "==", auth.currentUser.uid),
                orderBy("timestamp", "desc"),
                limit(postsPerPage),
            )
        ).then(
            res => res.docs.map(
                doc => doc.data()
            )
        );
        setPosts(posts)
        setLastVisible(posts[posts.length - 1].timestamp);
    }

    const getNextPage = async () => {
        const posts = await getDocs(
            query(
                collection(db, 'posts'),
                where("deleted", "==", false),
                orderBy("timestamp", "desc"),
                startAfter(lastVisible),
                limit(postsPerPage),
            )
        ).then(
            res => res.docs.map(
                doc => doc.data()
            )
        );
        setPosts(posts)
        setLastVisible(posts[posts.length - 1].timestamp);
        setPage(page + 1);
    }

    const getPreviousPage = async () => {
        const posts = await getDocs(
            query(
                collection(db, 'posts'),
                where("deleted", "==", false),
                orderBy("timestamp", "desc"),
                endBefore(firstVisible),
                limit(postsPerPage),
            )
        ).then(
            res => res.docs.map(
                doc => doc.data()
            )
        );
        setPosts(posts)
        setFirstVisible(posts[0].timestamp);
        setPage(page - 1);
    }



    useEffect(async () => {
        getPosts()
        getPosts1()
        const postCount = await getDocs(
            query(
                collection(db, 'postsList'),
                where("deleted", "==", false),
            )
        ).then(
            res => res.docs.length
        );
        setPostCount(postCount)
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
                    onClick={() => {
                        if (page > 1) {
                            setPage(page - 1);
                            getPreviousPage()
                        }
                    }}
                >
                    Previous
                </button>
                <p> {page} </p>
                <button
                    className="pagination-button"
                    onClick={() => {
                        if (page < Math.ceil(postCount / postsPerPage)) {
                            setPage(page + 1)
                            getNextPage()
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