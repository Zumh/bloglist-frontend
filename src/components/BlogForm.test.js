import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

/*
Make a test for the new blog form. The test should check,
that the form calls the event handler it received as props with the right details
when a new blog is created.
 we have title, author, url as input value.
*/


test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const sampleData = ['title', 'author', 'url']

  for(let i = 0; i < 3; i++) {
    await user.type(inputs[i], sampleData[i])
  }

  const sendButton = screen.getByText('create')
  await user.click(sendButton)


  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: sampleData[0],
    author: sampleData[1],
    url: sampleData[2],
  })
})
