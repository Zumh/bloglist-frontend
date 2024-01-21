
import { useState } from "react"



const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [detailVisibility, setDetailVisibility] = useState(false)
  const showOrHide = detailVisibility ? 'hide' : 'view'
  const visibilityStyle = detailVisibility ? {} : { display: 'none' }
  return (
  <div style={blogStyle}>
    {blog.title} {blog.author}
    <button onClick={() => setDetailVisibility(!detailVisibility)}>{showOrHide}</button>
    <div style={visibilityStyle}>
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button onClick={() => blogService.like(blog)}>like</button></div>
      
      <div>{blog.user.name}</div>
    </div>
    
  </div> 
  ) 
}

export default Blog

