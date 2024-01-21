import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = ({setMessage, setMessageStatus, setBlogs}) => {
  const blogObject = {
    title: '',
    author: '',
    url: '',
  }
  const [newBlog, setNewBlog] = useState({...blogObject}) // Object.assign({},blogObject)

  const addBlog = (event) => {
    event.preventDefault()
    blogService
      .create({...newBlog})
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog({...blogObject})
        setMessage('A new blog added')
        setMessageStatus('success')

      }).catch(error => {
        // set the error message and show for 5 seconds and then hide it
        // also we reset the setError Message to null
        setMessage(error.response.data.error)
        setMessageStatus('error')
      })

    setTimeout(() => {
      setMessage(null)
      setMessageStatus(null)
    }, 5000)

  }

    return (
    <div>
    <h2>create new</h2>
    <form onSubmit={addBlog}>
      title: <input
        type="text" 
        value={newBlog.title}
        onChange={({ target }) => setNewBlog({...newBlog, title: target.value})}
      />
      <br/>
      author: <input 
        type="text"
        value={newBlog.author}
        onChange={({ target }) => setNewBlog({...newBlog, author: target.value})}
      />
      <br/>
      url: <input 
        type="text"
        value={newBlog.url}
        onChange={({ target }) => setNewBlog({...newBlog, url: target.value})}
      />
      <br/>
      <button type='submit'>create</button>
    </form>
    </div>
    )
  }

  export default CreateBlog