import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> call event handler received as props with right details', async () => {
  const handleCreate = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm handleCreate={handleCreate} />)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('Create')

  await user.type(inputs[0], 'Hello Testing')
  await user.type(inputs[1], 'Anh')
  await user.type(inputs[2], 'localhost')
  await user.click(sendButton)

  expect(handleCreate.mock.calls).toHaveLength(1)
  expect(handleCreate.mock.calls[0][0].title).toBe('Hello Testing')
  expect(handleCreate.mock.calls[0][0].author).toBe('Anh')
  expect(handleCreate.mock.calls[0][0].url).toBe('localhost')
})