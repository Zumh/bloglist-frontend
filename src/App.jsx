import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Footer from './components/Footer'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'


const App = () => {
  
  const [blogs, setBlogs] = useState([])


  const [message, setMessage] = useState(null)
  const [messageStatus, setMessageStatus] = useState(null)


  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [createVisibility, setCreateVisibility] = useState(false)


   // store user details in local storage only if user is logged in
  // when we refresh the page the user will still be logged in
  // token must be set first before fetching blogs and token is in global variable not in a state
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

      blogService.getAll().then(blog =>
      setBlogs( blog ))
    }
  }, [])

//   useEffect(() => {
//     blogService.getAll().then(blogs =>
//     setBlogs( blogs ))
// }, [])



 
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

      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
      // we reinitialize the rest of the state for the login form
      setUsername('')
      setPassword('')

      setMessage('Login sucess!')
      setMessageStatus('success')
    
    } catch(exception) {
      // set the error message and show for 5 seconds and then hide it
      // also we reset the setError Message to null
      setMessage(exception.response.data.error)
      setMessageStatus('error')
    
    }

    setTimeout(() => {
      setMessage(null)
      setMessageStatus(null)
    }, 5000)
    
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
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
const blogForm = () => {
  const showWhenVisible = { display: createVisibility ? '' : 'none' }
  const hideWhenVisible = { display: createVisibility ? 'none' : '' }

  return (<div>
    <div style={hideWhenVisible}>
      <button onClick={() => setCreateVisibility(true)}>create new</button>
    </div>
    <div style={showWhenVisible}>
      <CreateBlog setMessage={setMessage} setMessageStatus={setMessageStatus} setBlogs={setBlogs}/>
    </div>
    <button onClick={() => setCreateVisibility(false)}>cancel</button>
    
      <ul>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </ul>
  </div>)
}



  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} messageStatus={messageStatus} />
  
      {!user && loginForm()}
      {user && <div> <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button></p> {blogForm()}</div>}

     <Footer />
    </div>
  )
}

export default App