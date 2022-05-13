import { getDocs, query, where, doc, collection, setDoc, addDoc, updateDoc, serverTimestamp, orderBy } from "firebase/firestore";
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
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentUser, setCommentUser] = useState("");
  const [commentEmail, setCommentEmail] = useState("");

  const [commentNum, setCommentNum] = useState(0);


  useEffect(async () => {
    console.log("post");
    await getDocs(query(collection(db, "posts"), where("postNum", "==", postNum))).then((res) => setPost(res.docs[0].data()));
    console.log("post2");
    await getDocs(query(collection(db, "comments"), where("postNum", "==", postNum), orderBy("commentNum", "asc"))).then((res) => setComments(res.docs.map(doc => doc.data())));
    console.log("post3");
    await getDocs(query(collection(db, "comments"), where("postNum", "==", postNum))).then((res) => setCommentNum(res.docs.length));
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
    }, 2500);
  }

  const handleComment = async () => {
    if (comment !== "") {
      await addDoc(collection(db, "comments"), {
        postNum,
        comment,
        name: commentUser,
        email: commentEmail,
        commentNum: commentNum + 1,
      });
      await getDocs(query(collection(db, "comments"), where("postNum", "==", postNum), orderBy("commentNum", "asc"))).then((res) => setComments(res.docs.map(doc => doc.data())));
      setComment("");
    }
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
            <div className="comments">
              <h3>Comments</h3>
              <br />
              <div className="comment-list">
                {
                  comments.length > 0 ?
                    comments.map((comment) => (
                      <div className="comment-item" key={comment.commentNum}>
                        <div className="comment-item-user">
                          <p>{comment.name}</p>
                        </div>
                        <div className="comment-item-body">
                          <p>{comment.comment}</p>
                        </div>
                      </div>
                    ))
                    :
                    <>
                      <p>No comments yet!</p>
                    </>
                }
              </div>
              <div className="comment-form">
                <input
                  id="comment-user"
                  placeholder="Enter your name"
                  value={commentUser}
                  onChange={(e) => setCommentUser(e.target.value)}
                />
                <input
                  id="comment-email"
                  placeholder="Enter your email"
                  value={commentEmail}
                  onChange={(e) => setCommentEmail(e.target.value)}
                />
                <textarea
                  id="comment"
                  rows="4"
                  cols="50"
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button id="comment-button" onClick={() => handleComment()}>
                  Comment
                </button>
              </div>
            </div>
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
