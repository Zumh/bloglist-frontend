import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const blogObject = {
    title: '',
    author: '',
    url: '',
    name: '',

  }
  const [newBlog, setNewBlog] = useState({ ...blogObject }) // Object.assign({},blogObject)

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      name: newBlog.name
    })
    setNewBlog({ ...blogObject })
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
      title: <input
          id='title'
          type="text"
          value={newBlog.title}
          onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}

        />
        <br/>
      author: <input
          id='author'
          type="text"
          value={newBlog.author}
          onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
        />
        <br/>
      url: <input
          id='url'
          type="text"
          value={newBlog.url}
          onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
        />
        <br/>
        <button id='create-btn' type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm