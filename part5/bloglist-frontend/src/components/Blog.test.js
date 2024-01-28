import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  const mockHandler = jest.fn()

  const blog = {
    title: 'Test Jest',
    author: 'Anh Nguyen',
    url: 'localhost',
    likes: 2,
    user: {
      name: 'Anh'
    }
  }

  const user = userEvent.setup()

  beforeEach(() => {
    container = render(<Blog blog={blog} user={user} handleLike={mockHandler}/>).container
  })

  test('renders title and author', () => {
    const div = container.querySelector('.originalContent')
    const div1 = container.querySelector('.expandContent')

    screen.debug()

    expect(div).toHaveTextContent(
      'Test Jest - Anh Nguyen'
    )
    expect(div1).toHaveStyle('display: none')
  })

  test('clicking the button show URL and number of like', async () => {
    const button = screen.getByText('View')
    await user.click(button)

    const div = container.querySelector('.expandContent')
    const div1 = container.querySelector('.originalContent')

    screen.debug()

    expect(div).not.toHaveStyle('display: none')
    expect(div1).toHaveStyle('display: none')
  })

  test('clicking button twice the props received is 2', async () => {
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})