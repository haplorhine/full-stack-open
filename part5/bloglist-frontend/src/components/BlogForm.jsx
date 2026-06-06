import { TextField, Button } from '@mui/material'

import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      url,
      title,
      author,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <TextField
          label="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          margin="dense"
        />
        <br />
        <TextField
          label="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          margin="dense"
        />
        <br />

        <TextField
          label="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          margin="dense"
        />

        <div>
          <Button type="submit" variant="contained">
            create
          </Button>
        </div>
      </form>
    </>
  )
}

export default BlogForm
