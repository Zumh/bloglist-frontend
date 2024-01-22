
import { useState } from 'react'
import blogService from '../services/blogs'
import '../index.css'

const Blog = ({ blog, name, setMessage, setMessageStatus, updatedLikesLocally,  removeBlogLocally }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [detailVisibility, setDetailVisibility] = useState(false)
  const showOrHide = detailVisibility ? 'hide' : 'view'


  const likeUpdate = () => {
    const { id, ...updatedBlog } = blog
    const modifiedBlog = { ...updatedBlog, user: updatedBlog.user.id, likes: updatedBlog.likes + 1 }
    blogService.update(blog.id, modifiedBlog).then( () => {
      // update blogs that was just liked
      updatedLikesLocally(blog.id)

    }).catch(error => {
      setMessage(error.response.data.error)
      setMessageStatus('error')

    })
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .remove(blog.id)
        .then(() => {
          // remove blogs that was just deleted from blogs locally

          removeBlogLocally(blog.id)
          setMessage(`Removed blog ${blog.title} by ${blog.author}`)
          setMessageStatus('success')

        })
        .catch(error => {
          setMessage(error.response.data.error)
          setMessageStatus('error')

        })
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
          <div className="blogLikes">likes {blog.likes} <button  className="likeButton" onClick={likeUpdate}>like</button></div>

          <div>{name}</div>
          <button className="buttonStyle" onClick={removeBlog}>remove</button>
        </div>
      )}

    </div>
  )
}

export default Blog

