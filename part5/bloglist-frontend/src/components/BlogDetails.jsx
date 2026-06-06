import Blog from './Blog'
import LikeButton from './LikeButton'

const BlogDetails = ({ blog, onLike, onRemove, canLike }) => {
  if (!blog) {
    return null
  }

  return (
    <>
      <h2>
        {blog.author}: {blog.title}
      </h2>
      <a className="blogUrl" href={blog.url}>
        {blog.url}
      </a>
      <div className="likes">
        likes {blog.likes}
        {canLike && <LikeButton onLike={onLike} />}
      </div>
      <div>Added by {blog.user?.name}</div>
      <button onClick={onRemove}>remove</button>
    </>
  )
}

export default BlogDetails
