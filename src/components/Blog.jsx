
import { useState, useEffect } from 'react'

import '../index.css'

const Blog = ({ blog, user, updatedLike,  removeBlog }) => {


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [detailVisibility, setDetailVisibility] = useState(false)
  const [blogOwner, setBlogOwner] = useState('')


  useEffect(() => {
    // decode and extract id from user
    setBlogOwner(user.username === blog.user.username)

  }, [user.username, blog.user.username])

  const showOrHide = detailVisibility ? 'hide' : 'view'

  // show the remove button if the user is the creator of the blog


  const handleLikeUpdate = async () => {
    const { id, ...updatedBlog } = blog
    const modifiedBlog = { ...updatedBlog, user: updatedBlog.user.id, likes: updatedBlog.likes + 1 }

    await updatedLike(id, modifiedBlog)
  }

  const handleRemoveBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await removeBlog(`Removed blog ${blog.title} by ${blog.author}`, blog.id)
    }
  }




  return (
    <div style={blogStyle} className='blog'>

      <span className="blogTitle">{blog.title}</span>
      <span className="blogAuthor"> {blog.author}</span>
      <button className="viewButton" onClick={() => setDetailVisibility(!detailVisibility)}>{showOrHide}</button>
      {detailVisibility && (
        <div className='blogDetails'>
          <div className="blogUrl">{blog.url}</div>
          <div className="blogLikes">likes: {blog.likes} <button  className="likeButton" onClick={handleLikeUpdate}>like</button></div>

          <div>{blog.user.name}</div>
          {blogOwner && (<div><button className="buttonStyle" onClick={handleRemoveBlog}>remove</button></div>)}

        </div>
      )}

    </div>
  )
}

export default Blog

