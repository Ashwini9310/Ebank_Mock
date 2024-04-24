import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

const Login = () => {
  const history = useHistory()
  const [userId, setUserId] = useState('')
  const [pin, setPin] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    if (!userId.trim() || !pin.trim()) {
      setErrorMessage('Please enter both User ID and PIN')
      return
    }
    try {
      const response = await fetch('https://apis.ccbp.in/ebank/login', {
        method: 'POST',
        body: JSON.stringify({
          user_id: userId,
          pin: pin,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      })
      const data = await response.json()
      if (response.ok) {
        setErrorMessage('')
        localStorage.setItem('jwt_token', data.jwt_token)
        history.replace('/')
      } else {
        setErrorMessage(data.error_msg)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
        alt="website login"
      />
      <h1>Welcome Back</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="userId">User ID</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={e => setUserId(e.target.value)}
        />
        <br />
        <label htmlFor="pin">PIN</label>
        <input
          type="password"
          id="pin"
          value={pin}
          onChange={e => setPin(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p>*{errorMessage}</p>}
    </div>
  )
}

export default Login
