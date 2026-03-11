import { render, screen } from '@testing-library/react'
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
