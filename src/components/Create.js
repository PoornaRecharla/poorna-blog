import React, { useEffect, useState } from "react";
import { doc, addDoc, collection, serverTimestamp, setDoc, getDocs, updateDoc, arrayUnion, increment } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from 'react-router-dom';
import MediumEditor from "medium-editor";
import './../../node_modules/medium-editor/dist/css/medium-editor.min.css'
import './../../node_modules/medium-editor/dist/css/themes/default.min.css'
import './Create.css'

function Create() {

  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const [published, setPublished] = useState(true);
  const [postHtml, setPostHtml] = useState('');

  useEffect(() => {
    const editor = new MediumEditor(".medium-editable", {
      autoLink: true,
      delay: 1000,
      targetBlank: true,
      toolbar: {
        buttons: [
          'bold',
          'italic',
          'quote',
          'underline',
          'anchor',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'strikethrough',
          'subscript',
          'superscript',
          'pre',
          'image',
          'html',
          'justifyCenter'
        ],
        diffLeft: 25,
        diffTop: 10,
      },
      anchor: {
        placeholderText: 'Type a link',
        customClassOption: 'btn',
        customClassOptionText: 'Create Button'
      },
      paste: {
        cleanPastedHTML: true,
        cleanAttrs: ['style', 'dir'],
        cleanTags: ['label', 'meta'],
        unwrapTags: ['sub', 'sup']
      },
      anchorPreview: {
        hideDelay: 300
      },
      placeholder: {
        text: 'Tell your story...'
      }
    })
    editor.subscribe('editableInput', () => {
      if (typeof document !== 'undefined') {
        setPostHtml(editor.getContent(0))
      }
    })
    document.getElementById('title').focus();
  }, [])

  const postsCollectionRef = collection(db, "posts");

  const createPost = async () => {

    if (title === '' || postHtml === '') {
      alert('Please fill in all fields')
    } else {


      const post = await addDoc(postsCollectionRef, {})

      const metaDataRef = collection(db, "metaData");
      const metaData = await getDocs(metaDataRef);
      const postNum = metaData.docs.map(doc => doc.data())[0].allPosts + 1;

      await setDoc(doc(db, "posts", post.id), {
        id: post.id,
        title,
        body: postHtml,
        timestamp: serverTimestamp(),
        published,
        tags,
        postNum
      })

      tags.forEach(async tag => {
        await updateDoc(doc(db, "tags", "tags"), {
          [tag]: arrayUnion(post.id)
        })
      })

      published ?
        await updateDoc(doc(db, "metaData", "metaData"), {
          publishedPosts: arrayUnion(post.id),
          allPosts: increment(1),
          posts: arrayUnion(post.id)
        })
        :
        await updateDoc(doc(db, "metaData", "metaData"), {
          unpublishedPosts: arrayUnion(post.id),
          allPosts: increment(1),
          posts: arrayUnion(post.id)
        })

      console.log(post.id);
      setTitle('');
      setTag('');
      setTags([]);
      setPublished(true);
      setPostHtml('');
      document.getElementById('title').innerHTML = '';
      document.getElementById('medium-editable').innerHTML = '';
      document.getElementById('title').focus();
    }
  }

  return (
    <>
      {/* <h2>Add a New Post</h2> */}
      <div className="form-group">
        <input type="text" className="form-control" name="title" id="title" placeholder="Please enter the Title" onChange={(e) => setTitle(e.target.value)} />
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
      <form className="editor-form main-editor" autoComplete="off" >
        <div className="form-group">
          <textarea id="medium-editable" className="medium-editable" ></textarea>
        </div>
      </form>
      <hr />
      <br />
      {/* <input type="text" name="post-html" id="post-html" value={postHtml} onChange={(e) => setPostHtml(e.target.value)} /> */}
      <textarea name="post-html" id="post-html" cols="30" rows="10" value={postHtml} onChange={(e) => setPostHtml(e.target.value)}></textarea>
      <br />
      <br />
      <div className="form-group">
        <label htmlFor="published">Publish</label>
        <input type="checkbox" name="published" id="published" checked={published} onChange={(e) => setPublished(e.target.checked)} />
      </div>
      <br />
      <div className="preview-container">
        <div className="preview-title">
          <h2>{title}</h2>
        </div>
        <div className="preview-body">
          <div dangerouslySetInnerHTML={{ __html: postHtml }} />
        </div>
      </div>

      <button type="button" className="btn btn-primary" onClick={createPost}>Create</button>
    </>
  )
}

export default Create
