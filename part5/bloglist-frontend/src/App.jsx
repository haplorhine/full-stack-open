import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { create } from 'axios'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogURL, setBlogURL] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const userInStorage = window.localStorage.getItem('loggedInUser')
    if (userInStorage) {
      const user = JSON.parse(userInStorage)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, type) => {
    setNotification({ message, type })
    window.setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch {
      showNotification('wrong credentials', 'error')
    }
  }

  const createBlogEntry = async () => {
    event.preventDefault()
    console.log('create entry')

    const returnedBlogEntry = await blogService.createEntry({
      title: blogTitle,
      url: blogURL,
      author: blogAuthor,
    })
    setBlogs(blogs.concat(returnedBlogEntry))
    showNotification(
      `A new blog ${returnedBlogEntry.title} by ${returnedBlogEntry.author} added`,
    )
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    setBlogs([])
  }

  const loginForm = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification notification={notification} />
        <form onSubmit={handleLogin}>
          <label>
            username
            <input
              onChange={({ target }) => setUsername(target.value)}
              type="text"
              name=""
              id="userName"
            />
          </label>
          <br />
          <label>
            password
            <input
              onChange={({ target }) => setPassword(target.value)}
              type="password"
              name=""
              id="password"
            />
          </label>
          <br />
          <input type="submit" value="login" />
        </form>
      </div>
    )
  }

  const blogList = () => {
    return (
      <>
        <h2>blogs</h2>
        <Notification notification={notification} />
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>

        <h2>create new</h2>
        <form onSubmit={createBlogEntry}>
          <label>
            title
            <input
              type="text"
              value={blogTitle}
              onChange={({ target }) => setBlogTitle(target.value)}
            />
          </label>
          <br />
          <label>
            author
            <input
              type="text"
              value={blogAuthor}
              onChange={({ target }) => setBlogAuthor(target.value)}
            />
          </label>
          <br />
          <label>
            url
            <input
              type="text"
              value={blogURL}
              onChange={({ target }) => setBlogURL(target.value)}
            />
          </label>
          <br />
          <input type="submit" value="create" />
        </form>

        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </>
    )
  }

  if (user) {
    return <div>{blogList()}</div>
  }
  return loginForm()
}

export default App
