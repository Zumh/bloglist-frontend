import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = (event) => {
    event.preventDefault()
    login({
      username, password
    })
    // we reinitialize the rest of the state for the login form

    setUsername('')
    setPassword('')
  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1>log in to application</h1>
        <div>
                username <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
                password <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}
export default LoginForm