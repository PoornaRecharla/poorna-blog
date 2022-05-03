import React from 'react'
import { Link } from 'react-router-dom'
import './Post.css'

export default function Post(post) {
    const { id, title, body, timestamp } = post.post;

    const dateConverter = (timestamp) => {
        return new Date(timestamp.seconds * 1000).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    document.title = title;
    // document.getElementsByClassName('post-body')[0].innerHTML = body;   

    return (
        <div className='post'>
            <Link to={`/post/${id}`}>
                <div className='post-title'>
                    {title}
                </div>
                <div className='post-date'>
                    <p>{ dateConverter(timestamp) }</p>
                </div>
                <div className='post-body'>
                    {body}
                </div>
            </Link>
        </div>
    )
}
