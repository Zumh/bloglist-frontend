import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    author: 'Component testing is done with react-testing-library',
    title: 'title01',
    url: 'test.com',
    likes: 0
  }
  render(<Blog blog={blog} />)
  screen.debug()
  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})