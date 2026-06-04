import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LikeButton from './LikeButton'

test('clicking the like button twice, calls event handler the component received as props twice', async () => {
  const mockHandler = vi.fn()

  render(<LikeButton onLike={mockHandler} />)
  const user = userEvent.setup()
  const button = screen.getByText('like')

  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
