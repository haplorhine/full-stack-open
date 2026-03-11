import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('form calls the event handler with the right details when new blog is created.', async () => {
  const user = userEvent.setup()
  const addBlog = vi.fn()

  render(<BlogForm createBlog={addBlog} />)

  const titleInput = screen.getByLabelText('title')
  const authorInput = screen.getByLabelText('author')
  const urlInput = screen.getByLabelText('url')
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'a test blogtitle')
  await user.type(authorInput, 'the author')
  await user.type(urlInput, 'https://cool.example.com/')
  await user.click(createButton)

  expect(addBlog.mock.calls).toHaveLength(1)

  const { title, author, url } = addBlog.mock.calls[0][0]

  expect(title).toBe('a test blogtitle')
  expect(author).toBe('the author')
  expect(url).toBe('https://cool.example.com/')
})
