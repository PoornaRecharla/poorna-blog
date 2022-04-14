import React, { useEffect, useState } from 'react'
import { getDocs, collection, deleteDoc, doc, query, orderBy, limit, setDoc, where, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../firebase-config";

function Dummy() {

    // const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState({ 'id' : 'photoURL' });

    useEffect(async () => {
        const users = await getDocs(collection(db, "users")).then(
            res => res.docs.map(
                doc => doc.data()
            )
        )

        setUsers(previousState => ({
            ...previousState,
            [users[0].id] : users[0].photoURL
        }))
        // users.forEach(user => {
        //     const id = user.data().uid
        //     setUser(user.data())
        // })
        // const posts = await getDocs(collection(db, "posts"))
        // posts.forEach(post => {
        //     updateDoc(doc(db, "posts", post.id), {
        //         author: {
        //             id: post.data().author.id,
        //             name: post.data().author.name,
        //             photoURL: "https://www.w3schools.com/howto/img_avatar.png"
        //         }
        //     })
        // })
        console.log(users)
        // await getDocs(collection(db,'posts')).then(res => setPosts(res.docs.map(doc => doc.data())))
        // console.log(posts);
    }, [])

    return (
        <>
            <div>Dummy</div>
            {/* <div>{JSON.stringify(posts)}</div> */}
            {
                // posts.length > 0 ?
                //     posts.map(post => {
                //         updateDoc(doc(db, 'postsList', post.id), {
                //             id: post.id,
                //             title: post.title,
                //             timestamp: post.timestamp,
                //             author: post.author,
                //             tags: post.tags,
                //             deleted: post.deleted,
                //             body: deleteField()
                //         })
                //     })
                //     :
                //     <p>Loading...</p>
                // JSON.stringify(user)
                // console.log(user)
                users && users.length > 0 ?
                    users.map(user => {
                        // JSON.stringify(user)
                        console.log(user.uid, user.photoURL)
                    })
                    :
                    <p>Loading...</p>

            }
        </>
    )
}

export default Dummy