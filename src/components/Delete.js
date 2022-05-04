import { addDoc, arrayRemove, collection, deleteDoc, doc, getDocs, increment, query, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../firebase-config';

function Delete() {

  const navigate = useNavigate();
  const postNum = parseInt(useParams().postNum);
  const [post, setPost] = useState(null);

  useEffect(async () => {
    await getDocs(query(collection(db, "posts"), where("postNum", "==", postNum))).then((res) => setPost(res.docs[0].data()));
  }, [])

  const DeletePost = async () => {
    await setDoc(doc(db, "deletedPosts", post.id), post)
    await deleteDoc(doc(db, "posts", post.id));
    await updateDoc(doc(db, "metaData", "metaData"), {
      allPosts: increment(-1),
      posts: arrayRemove(post.id),
      publishedPosts: arrayRemove(post.id)
    })
    post.tags.forEach(async tag => {
      await updateDoc(doc(db, "tags", "tags"), {
        [tag]: arrayRemove(post.id)
      })
    })
    console.log(post.id);
    window.location.href = '/';
  }

  return (
    <div>
      <button onClick={DeletePost}>Delete Post</button>
      {
        post ?
          <div>
            <h2>{post.title}</h2>
            published: {post.published ? "true" : "false"}
            <p>tags: {post.tags.join(", ")}</p>
            <p dangerouslySetInnerHTML={{ __html: post.body }} />
          </div>
          :
          <div>
            <h2>Loading...</h2>
          </div>
      }
    </div>
  )
}

export default Delete