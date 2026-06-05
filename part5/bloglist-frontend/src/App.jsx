import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import LoggedInUser from './components/LoggedInUser'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  const toggleRef = useRef()

  const navigate = useNavigate()

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.toSorted((a, b) => b.likes - a.likes)))
  }, [])

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
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    navigate('/')
  }

  const addBlog = async (blogObject) => {
    toggleRef.current.toggleVisibility()

    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog).toSorted((a, b) => b.likes - a.likes))

    setNotificationMessage(
      `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
    )
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const addLikeTo = async (blog) => {
    const changedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const returnedBlog = await blogService.update(changedBlog)
    setBlogs(blogs.map((b) => (b.id !== blog.id ? b : returnedBlog)))
  }

  const removeBlog = async (blog) => {
    if (!confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      return
    }
    await blogService.remove(blog.id)
    setBlogs(blogs.filter((b) => b.id !== blog.id))
  }

  const padding = { padding: '5px' }

  return (
    <div>
      <nav>
        <Link style={padding} to="/">
          blogs
        </Link>
        {!user && (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
        {user && <button onClick={handleLogout}>logout</button>}
      </nav>

      {/* <LoggedInUser user={user} onLogout={handleLogout} /> */}

      <Routes>
        <Route
          path="/login"
          element={
            user ? (
              <Navigate replace to="/" />
            ) : (
              <div>
                <h2>Log in to application</h2>
                <Notification className="error" message={errorMessage} />
                <LoginForm
                  username={username}
                  password={password}
                  setUsername={setUsername}
                  setPassword={setPassword}
                  onLogin={handleLogin}
                />
              </div>
            )
          }
        />

        <Route
          path="/"
          element={
            <>
              <h2>blogs</h2>
              <Notification
                className="notification"
                message={notificationMessage}
              />

              {/* <h2>create new</h2>
              <Togglable buttonLabel="create new blog" ref={toggleRef}>
                <BlogForm createBlog={addBlog} />
              </Togglable> */}
              {blogs.map((blog) => (
                <Blog
                  onLike={() => addLikeTo(blog)}
                  onRemove={() => removeBlog(blog)}
                  key={blog.id}
                  blog={blog}
                />
              ))}
            </>
          }
        />
      </Routes>
    </div>
  )
}

export default App
