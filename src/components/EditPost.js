import React from 'react'

function EditPost() {
  return (
    <div>EditPost</div>
  )
}

export default EditPost


// import React from 'react'
// import { useEffect, useState } from 'react'
// import { getDocs, collection, query, orderBy, limit, where, startAt, updateDoc, setDoc, doc, arrayUnion, increment } from 'firebase/firestore'
// import { db } from '../firebase-config'
// import { useParams } from 'react-router-dom'

// function EditPost() {
//     const postNum = parseInt(useParams().postNum)
//     const [post, setPost] = useState({})
//     // const [postNum, setPostNum] = useState(0)
//     const [title, setTitle] = useState('')
//     const [body, setBody] = useState('')
//     const [published, setPublished] = useState(false)
//     const [timestamp, setTimestamp] = useState('')
//     const [tags, setTags] = useState([])
//     const [tag, setTag] = useState('')
//     const [postHtml, setPostHtml] = useState('')

//     useEffect(() => {
//         getDocs(query(collection(db, 'posts'), where('postNum', '==', postNum))).then(res => {
//             setPost(res.docs[0].data())
//             setTitle(res.docs[0].data().title)
//             setBody(res.docs[0].data().body)
//             setPublished(res.docs[0].data().published)
//             setTimestamp(res.docs[0].data().timestamp)
//         })
//     }, [])

//     const editPost = async () => {
//         const post = {
//             title,
//             body,
//             published,
//             timestamp,
//             tags,
//             postHtml
//         }
//         await updateDoc(doc(db, 'posts', post.id), post)
//         tags.forEach(async tag => {
//             await updateDoc(doc(db, 'tags', 'tags'), {
//                 [tag]: arrayUnion(post.id)
//             })
//         })
//         if (published) {
//             await updateDoc(doc(db, 'metaData', 'metaData'), {
//                 publishedPosts: arrayUnion(post.id),
//                 allPosts: increment(1),
//                 posts: arrayUnion(post.id)
//             })
//         } else {
//             await updateDoc(doc(db, 'metaData', 'metaData'), {
//                 unpublishedPosts: arrayUnion(post.id),
//                 allPosts: increment(1),
//                 posts: arrayUnion(post.id)
//             })
//         }
        
//         // e.preventDefault()
//         // const post = {
//         //     title,
//         //     body,
//         //     published,
//         //     timestamp,
//         //     postNum
//         // }
//         // setPost(post)
//         // // setTitle('')
//         // // setBody('')
//         // // setPublished(false)
//         // // setTimestamp('')
//         // // setPostNum(0)
//         // getDocs(collection(db, 'posts')).then(res => {
//         //     res.docs.map(doc => {
//         //         if (doc.data().postNum === postNum) {
//         //             doc.ref.update(post)
//         //         }
//         //     })
//         // })

//     }

//     return (
//         <div className="edit-post">
//             <div className="form-group">
//                 <input type="text" className="form-control" name="title" id="title" placeholder="Please enter the Title" onChange={(e) => setTitle(e.target.value)} />
//             </div>
//             <div className="form-group">
//                 <input type="text" className="form-control" name="tag" id="tag" placeholder="Tags" onChange={(e) => setTag(e.target.value)}
//                     onKeyUpCapture={(e) => {
//                         if (e.key === 'Enter') {
//                             if (!tags.includes(tag))
//                                 setTags([...tags, tag])
//                             e.target.value = ''
//                         }
//                     }} />
//                 <div>
//                     {
//                         tags.map((tag, index) => {
//                             return (
//                                 <button type="button" className="tags" onClick={() => setTags(tags.filter((t, i) => i !== index))} key={index} >
//                                     {tag} &times;
//                                 </button>
//                             )
//                         })
//                     }
//                 </div>
//             </div>
//             <br />
//             <form className="editor-form main-editor" autoComplete="off" >
//                 <div className="form-group">
//                     <textarea id="medium-editable" className="medium-editable" ></textarea>
//                 </div>
//             </form>
//             <hr />
//             <br />
//             {/* <input type="text" name="post-html" id="post-html" value={postHtml} onChange={(e) => setPostHtml(e.target.value)} /> */}
//             <textarea name="post-html" id="post-html" cols="30" rows="10" value={postHtml} onChange={(e) => setPostHtml(e.target.value)}></textarea>
//             <br />
//             <br />
//             <div className="form-group">
//                 <label htmlFor="published">Publish</label>
//                 <input type="checkbox" name="published" id="published" checked={published} onChange={(e) => setPublished(e.target.checked)} />
//             </div>
//             <br />
//             <button type="button" className="btn btn-primary" onClick={editPost}>Create</button>
//             {/* <form onSubmit={handleSubmit}>
//             <div className="form-group">
//                 <label htmlFor="title">Title</label>
//                 <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
//             </div>
//             <div className="form-group">
//                 <label htmlFor="body">Body</label>
//                 <textarea className="form-control" id="body" value={body} onChange={(e) => setBody(e.target.value)} />
//             </div>
//             <div className="form-group">
//                 <label htmlFor="published">Published</label>
//                 <input type="checkbox" className="form-control" id="published" checked={published} onChange={(e) => setPublished(e.target.checked)} />
//             </div>
//             <button type="submit" className="btn btn-primary">Submit</button>
//         </form> */}
//         </div>
//     )
// }

// export default EditPost