import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <>
      {blog.title} by {blog.author}
    </>
  )
}

export default Blog
