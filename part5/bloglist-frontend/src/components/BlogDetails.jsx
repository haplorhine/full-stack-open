import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Blog from './Blog'
import LikeButton from './LikeButton'

const BlogDetails = ({ blog, onLike, onRemove, canLike, canRemove }) => {
  if (!blog) {
    return null
  }

  // return (
  //   <>
  //     <a className="blogUrl" href={blog.url}>
  //       {blog.url}
  //     </a>
  //     <div className="likes">
  //       likes {blog.likes}
  //       {canLike && <LikeButton onLike={onLike} />}
  //     </div>
  //     <div>Added by {blog.user?.name}</div>
  //     <button onClick={onRemove}>remove</button>
  //   </>
  // )

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {blog.title}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
          by {blog.author}
        </Typography>
        <Typography variant="body2">
          <a href={blog.url}>{blog.url}</a>
          <br />
          Added by {blog.user?.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography variant="subtitle1">likes {blog.likes} </Typography>
        {canLike && <LikeButton onLike={onLike} />}
        {canRemove && (
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={onRemove}
          >
            remove
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default BlogDetails
