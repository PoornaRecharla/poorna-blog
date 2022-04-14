import React from 'react'
import { Link } from 'react-router-dom'
import './Post.css'

export default function Post(post) {
    const { id, title, body, author, timestamp } = post.post;

    return (
        <div className='post'>
            <div className='post-header'>
                <img src={author.photoURL} alt='profile' width={40} height={40} style={{borderRadius:'50%'}} />
                {/* <svg width="40" height="40" viewBox="0 0 1000 1000" class="post-header-photo">
                    <circle cx="500" cy="500" r="500" fill="#cccccc"></circle>
                    <path fill="#a0a09f" d="M830.8,874.927c-77.344-60.8-187.181-104.877-227.88-111.347-20.335-3.233-20.8-59.1-20.8-59.1s59.746-59.106,72.768-138.584c35.029,0,56.666-84.5,21.631-114.226C677.986,420.37,721.551,206,501,206S324.015,420.37,325.473,451.666c-35.033,29.729-13.4,114.226,21.632,114.226,13.021,79.478,72.77,138.584,72.77,138.584s-0.464,55.871-20.8,59.1c-40.883,6.5-151.537,50.943-228.934,112.176C65.84,784.12,0,649.751,0,500,0,223.858,223.858,0,500,0s500,223.858,500,500C1000,649.3,934.559,783.311,830.8,874.927ZM500,1000h0Z"></path>
                </svg> */}
                <div className='post-header-details'>
                    <p style={{ fontStyle: 'italic' }}>
                        <Link to={`/profile/${author.id}`}>{author.name}</Link>
                    </p>
                    <p>
                        {
                            new Date(timestamp.seconds * 1000).toLocaleDateString(
                                "en-US",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }
                            )
                        } &#183; 2min
                    </p>
                </div>
            </div>
            <Link to={`/posts/${id}`}>
                <div className='post-title'>
                    {title}
                </div>
                <div className='post-body'>
                    {
                        // body preview of two lines of text
                        // body.length > 250 ?
                        //     body.substring(0, 250) + '...' :
                            body
                    }
                </div>
            </Link>
        </div>
    )
}
