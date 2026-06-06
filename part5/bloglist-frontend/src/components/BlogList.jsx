import { Link } from 'react-router-dom'
import Blog from './Blog'
import Notification from './Notification'

const BlogList = ({ blogs, notificationMessage }) => {
  return (
    <>
      <h2>blogs</h2>
      <Notification className="success" message={notificationMessage} />

      {/* <h2>create new</h2>
              <Togglable buttonLabel="create new blog" ref={toggleRef}>
                <BlogForm createBlog={addBlog} />
              </Togglable> */}
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              <Blog blog={blog} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default BlogList
