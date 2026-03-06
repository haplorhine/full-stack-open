import { useState } from 'react'

const Blog = ({ blog, onLike, onRemove }) => {
  const blogStyle = {
    padding: '.5em',
    border: '1px solid',
    borderRadius: '6px',
    background: 'aliceblue',
    marginBottom: '10px',
  }

  const [detailsShown, setDetailsShown] = useState(false)

  const toggleDisplay = () => {
    setDetailsShown(!detailsShown)
  }

  const blogDetails = () => (
    <>
      <div>{blog.url}</div>
      <div>
        {blog.likes} <button onClick={onLike}>like</button>
      </div>
      <div>{blog.user?.name}</div>
      <button onClick={onRemove}>remove</button>
    </>
  )

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={toggleDisplay}>{detailsShown ? 'hide' : 'view'}</button>
      {detailsShown && blogDetails()}
    </div>
  )
}

export default Blog
