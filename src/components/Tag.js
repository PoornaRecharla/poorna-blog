import { getDocs, collection, query, orderBy, limit, where, startAt } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase-config";
import Post from "./Post";

function Tag() {
  const { tag } = useParams();
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [postsPerPage] = useState(10);
  const [error, setError] = useState(false);

  const getPosts = async (page) => {
    const metaData = await getDocs(collection(db, "tags"))
    if (metaData.docs[0].data()[tag]) {
      const start = metaData.docs[0].data()[tag].reverse()[page * postsPerPage - postsPerPage]
      setPostCount(metaData.docs[0].data()[tag].length)
      const posts = await getDocs(
        query(
          collection(db, "posts"),
          where("published", "==", true),
          where("tags", "array-contains", tag),
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
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    getPosts(page);
  }, [])

  return (
    <>
      <div className="posts">
        <div className="heading">
          <h1>{tag}</h1>
        </div>
        <br />
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
            <p style={{ padding: '15px'}} >
              {error ? "No posts found for this tag \n " : "Loading..."}
            </p>
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
  )
}

export default Tag