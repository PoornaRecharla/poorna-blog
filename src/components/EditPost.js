// import React from 'react'

// function EditPost() {
//   return (
//     <div>EditPost</div>
//   )
// }

// export default EditPost


import React from 'react'
import { useEffect, useState } from 'react'
import { getDocs, collection, query, orderBy, limit, where, startAt, updateDoc, setDoc, doc, arrayUnion, increment } from 'firebase/firestore'
import { db } from '../firebase-config'
import { useParams } from 'react-router-dom'

function EditPost() {
  const postNum = parseInt(useParams().postNum)
  const [post, setPost] = useState({})
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [published, setPublished] = useState(false)
  const [timestamp, setTimestamp] = useState({})
  const [tags, setTags] = useState([])
  const [tag, setTag] = useState('')
  const [postHtml, setPostHtml] = useState('')

  useEffect(() => {
    getDocs(query(collection(db, 'posts'), where('postNum', '==', postNum))).then(res => {
      setPost(res.docs[0].data())
      setId(res.docs[0].id)
      setTitle(res.docs[0].data().title)
      setPublished(res.docs[0].data().published)
      setTags(res.docs[0].data().tags)
      setTimestamp(res.docs[0].data().timestamp)
      setPostHtml(res.docs[0].data().body)
    })
  }, [])

  const editPost = async () => {
    const post = {
      id,
      title,
      body: postHtml,
      published,
      timestamp,
      tags,
      postNum
    }
    await updateDoc(doc(db, 'posts', post.id), post)
    tags.forEach(async tag => {
      await updateDoc(doc(db, 'tags', 'tags'), {
        [tag]: arrayUnion(post.id)
      })
    })
    if (published) {
      await updateDoc(doc(db, 'metaData', 'metaData'), {
        publishedPosts: arrayUnion(post.id),
        allPosts: increment(1),
        posts: arrayUnion(post.id)
      })
    } else {
      await updateDoc(doc(db, 'metaData', 'metaData'), {
        unpublishedPosts: arrayUnion(post.id),
        allPosts: increment(1),
        posts: arrayUnion(post.id)
      })
    }
    console.log('post updated')
  }

  return (
    <div className="edit-post">
      <div className="form-group">
        <input type="text" className="form-control" name="title" id="title" placeholder="Please enter the Title" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div className="form-group">
        <input type="text" className="form-control" name="tag" id="tag" placeholder="Tags" onChange={(e) => setTag(e.target.value)}
          onKeyUpCapture={(e) => {
            if (e.key === 'Enter') {
              if (!tags.includes(tag))
                setTags([...tags, tag])
              e.target.value = ''
            }
          }} />
        <div>
          {
            tags.map((tag, index) => {
              return (
                <button type="button" className="tags" onClick={() => setTags(tags.filter((t, i) => i !== index))} key={index} >
                  {tag} &times;
                </button>
              )
            })
          }
        </div>
      </div>
      <br />
      <textarea name="post-html" id="post-html" cols="30" rows="10" value={postHtml} onChange={(e) => setPostHtml(e.target.value)}></textarea>
      <br />
      <br />
      <div className="form-group">
        <label htmlFor="published">Publish</label>
        <input type="checkbox" name="published" id="published" checked={published} onChange={(e) => setPublished(e.target.checked)} />
      </div>
      <br />
      <div className="preview-container">
        <p><strong>Preview:</strong></p>
        <br />
        <div className="preview-title">
          <h2>{title}</h2>
        </div>
        <div className="preview-body">
          <div dangerouslySetInnerHTML={{ __html: postHtml }} />
        </div>
      </div>
      <button type="button" className="btn btn-primary" onClick={editPost}>Edit</button>
    </div>
  )
}

export default EditPost