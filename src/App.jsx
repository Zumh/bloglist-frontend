import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Login from './components/Login'
import Footer from './components/Footer'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  
  const [blogs, setBlogs] = useState([])

  const [message, setMessage] = useState(null)
  const [messageStatus, setMessageStatus] = useState(null)

  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

   // store user details in local storage only if user is logged in
  // when we refresh the page the user will still be logged in
  // token must be set first before fetching blogs and token is in global variable not in a state
  // if the blogs state change the useEffect will run
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    
  }, [])

  useEffect(() => {
    if (user) {
 
      blogService.getAll().then(blogs =>{
        setBlogs( blogs )
      })
    }
  },[user])

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null)
        setMessageStatus(null)
      }, 5000)
    }
  }, [message])



  const login = async ({ username, password }) => {

    try {
      const loginUser = await loginService.login({
        username, password,
      })

      // store user details in local storage
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loginUser))

      // set token
      blogService.setToken(loginUser.token)

      // set a token and user details to user state that is coming from server
      // we can use this info for other requests
      setUser(loginUser)

      blogService.getAll().then(blog =>
        setBlogs( blog )
      )  

      setMessage('Login sucess!')
      setMessageStatus('success')
    
    } catch(exception) {
      // set the error message and show for 5 seconds and then hide it
      // also we reset the setError Message to null
      setMessage(exception.response.data.error)
      setMessageStatus('error')
    
    }


    
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  // loginform
 const loginForm = () => (
  <Login login={login} />
 )
  
 const createBlog = (newBlog) => {
  // it hide my create blog form after adding a new blog
  blogFormRef.current.toggleVisibility()
  blogService
    .create({ ...newBlog})
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setMessage('A new blog added')
      setMessageStatus('success')

    }).catch(error => {
      // set the error message and show for 5 seconds and then hide it
      // also we reset the setError Message to null
      setMessage(error.response? error.response.data.error:"Cannot add blog")
      setMessageStatus('error')
    })

 }
 
 const updatedLikesLocally = (id) => {
  setBlogs(blogs.map(blog => blog.id !== id ? blog : { ...blog, likes: blog.likes + 1 }))
 }

 const removeBlogLocally = (id) => {
  setBlogs(blogs.filter(blog => blog.id !== id))
 }

 // blogForm
const blogForm = () => (
  <div>
  <Togglable ref={blogFormRef} visible='create new' hide='cancel' >
    <BlogForm createBlog={createBlog}/>
  </Togglable>
  
    <ul>
       {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
         <Blog key={blog.id} 
         blog={blog} 
         name={user.name} 
         setMessage={setMessage} 
         setMessageStatus={setMessageStatus} 
         updatedLikesLocally={updatedLikesLocally} 
         removeBlogLocally={removeBlogLocally}
         />

        
       )}
     </ul>

    </div>

)

// App component returns JSX
  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} messageStatus={messageStatus} />
  
      {!user && loginForm()}
      {user && <div> <p>{user.name} logged in <button  onClick={() => handleLogout()}>logout</button></p> {blogForm()}</div>}

     <Footer />
    </div>
  )
}

export default App