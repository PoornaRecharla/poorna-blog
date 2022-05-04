import { getDocs, query, where, doc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import './PostDetails.css'
import { Share } from "@material-ui/icons";
import { Alert } from "react-bootstrap";

const PostDetails = () => {
  // parse the url to get the postNum as integer
  const postNum = parseInt(useParams().postNum);
  // const postNum = parseInt(a);
  // console.log(a,postNum);
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  // const [date, setDate] = useState("");
  const [alert, setAlert] = useState(false);

  useEffect(async () => {
    await getDocs(query(collection(db, "posts"), where("postNum", "==", postNum))).then((res) => setPost(res.docs[0].data()));
  }, []);

  const dateConverter = (timestamp) => {
    return new Date(timestamp.seconds * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const sharePost = () => {
    navigator.clipboard.writeText(window.location.href);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 1500);
  }

  return (
    <>
      {post.postNum === postNum ? (
        <div className="blog-details">
          {
            alert ?
              <Alert className="alert" variant="success" onClose={() => setAlert(false)} >
                <Alert.Heading>Copied to clipboard!</Alert.Heading>
                {/* <p>
          Share this link with your friends to share your post!
        </p> */}
              </Alert>
              :
              null
          }

          <article>
            {/* <h1>Post Details</h1> */}
            <div className="title">
              <h2>{post.title}</h2>
              <Share className="share-icon" onClick={() => sharePost()} />
            </div>
            <div className="date">
              <p>{dateConverter(post.timestamp)}</p>
            </div>
            <div>
              {post.tags.map((tag) => (
                <button id="post-tag" key={tag} onClick={() => navigate(`/tag/${tag}`)}>
                  {tag}
                </button>
              ))}
            </div>
            <div id='body' className="body" dangerouslySetInnerHTML={{ __html: post.body }} />
            <br />
            <button onClick={() => navigate(-1)}>Back</button>
            <br />
            {/* edit button */}
            {/* <button onClick={() => navigate(`/post/edit/${post.postNum}`)}>Edit</button> */}
          </article>
        </div>
      ) : (
        <>Loading</>
      )}
    </>
  );
};

export default PostDetails;
