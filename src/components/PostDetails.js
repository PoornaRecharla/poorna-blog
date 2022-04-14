import { getDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import './PostDetails.css'
import { Share, Twitter } from "@material-ui/icons";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [date, setDate] = useState("");

  useEffect(async () => {
    await getDoc(doc(db, "posts", id)).then((res) => setPost(res.data()))
  }, []);

  const dateConverter = (timestamp) => {
    return new Date(timestamp.seconds * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <>
      {post.id === id ? (
        <div className="blog-details">
          <article>
            <h1>Post Details</h1>
            <div className="title">
              <h2>{post.title}</h2>
              <Share />
              <Twitter />
            </div>
            <p>
              {dateConverter(post.timestamp)}
            </p>
            <p>Written by {post.author.name}</p>
            <div id='body' className="body" dangerouslySetInnerHTML={{ __html: post.body }} />
            <button onClick={() => navigate(-1)}>Back</button>
          </article>
        </div>
      ) : (
        <>Loading</>
      )}
    </>
  );
};

export default PostDetails;
