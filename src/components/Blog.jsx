
import { useState } from 'react'
import blogService from '../services/blogs'
import '../index.css'

const Blog = ({ blog, name, updatedLike,  removeBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [detailVisibility, setDetailVisibility] = useState(false)
  const showOrHide = detailVisibility ? 'hide' : 'view'

  const handleLikeUpdate = async () => {
    const { id, ...updatedBlog } = blog
    const modifiedBlog = { ...updatedBlog, user: updatedBlog.user.id, likes: updatedBlog.likes + 1 }

    updatedLike(id, modifiedBlog)
  }

  const handleRemoveBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(`Removed blog ${blog.title} by ${blog.author}`, blog.id)
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
          <div className="blogLikes">likes {blog.likes} <button  className="likeButton" onClick={handleLikeUpdate}>like</button></div>

          <div>{name}</div>
          <button className="buttonStyle" onClick={handleRemoveBlog}>remove</button>
        </div>
      )}

    </div>
  )
}

export default Blog

