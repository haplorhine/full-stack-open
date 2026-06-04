import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
  }

  render(<Blog blog={blog} />)

  screen.debug()

  const element = screen.getByText('Go To Statement Considered Harmful', {
    exact: false,
  })

  expect(element).toBeDefined()
})

test('renders author', () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Edsger W. Dijkstra', {
    exact: false,
  })

  expect(element).toBeDefined()
})

test('does not render url by default', () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blogUrl')
  expect(div).toBeNull()
})

test('does not render likes by default', () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 420,
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.likes')
  expect(div).toBeNull()
})

test('shows likes when details button is clicked', async () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 420,
  }

  render(<Blog blog={blog} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  screen.getByText('420')
})

test('shows url when details button is clicked', async () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 420,
  }

  render(<Blog blog={blog} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  screen.getByText(
    'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
  )
})
