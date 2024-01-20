import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Footer from './components/Footer'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [showAll, setShowAll] = useState(null)

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // store user details in local storage only if user is logged in
  // when we refresh the page the user will still be logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      // store user details in local storage
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      // set token
      blogService.setToken(user.token)

      // set a token and user details to user state that is coming from server
      // we can use this info for other requests
      setUser(user)
      // we reinitialize the rest of the state for the login form
      setUsername('')
      setPassword('')

    } catch(exception) {
      // set the error message and show for 5 seconds and then hide it
      // also we reset the setError Message to null
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    
  }

  // loginform
 const loginForm = () => (
  
  <form onSubmit={handleLogin}>
    <h1>log in to application</h1>
    <div>
      username
      <input
      type="text"
      value={username}
      name="Username"
      onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input
      type="password"
      value={password}
      name="Password"
      onChange={({ target }) => setPassword(target.value)}
      />  
    </div>
    <button type="submit">login</button>
  </form>  
 )
  
 // blogForm
const blogForm = () => (
  <form onSubmit={addBlog}>
    <input 
      value={newBlog}
      onChange={handleBlogChange}
    />
    <button type='submit'>save</button>
  </form>
)

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
  
      {!user && loginForm()}
      {user && <div> <p>{user.name} logged in</p> {blogForm()}</div>}

      
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'Hide' : 'Show'} all
        </button>
      </div>

      <ul>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </ul>

     <Footer />
    </div>
  )
}

export default App