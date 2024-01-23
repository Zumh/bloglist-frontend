import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    const blog = {
      author: 'Component testing is done with react-testing-library',
      title: 'title01',
      url: 'test.com',
      likes: 0
    }

    container = render(<Blog blog={blog} />).container
  })
  /**
 * Make a test, which checks that the component displaying a blog renders the blog's title and author, but
 * does not render its URL or number of likes by default.
Add CSS classes to the component to help the testing as necessary.
 */
  test(' a blog renders the blog\'s title and author, but does not render its URL or number of likes by default', () => {

    const div  = container.querySelector('.blog')
    const divTitle  = container.querySelector('.blogTitle')
    const divAuthor  = container.querySelector('.blogAuthor')
    const divUrl  = container.querySelector('.blogUrl')
    const divLikes  = container.querySelector('.blogLikes')

    expect(div).not.toHaveStyle('display: none')
    expect(divTitle).toBeInTheDocument()
    expect(divAuthor).toBeInTheDocument()
    expect(divUrl).toBeNull()
    expect(divLikes).toBeNull()

  })
  /*
Make a test, which checks that the blog's URL and number of likes are shown
when the button controlling the shown details has been clicked.
*/
  test('A blog renders the blog\'s URL and number of likes when the button controlling the shown details has been clicked', async () => {

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)


    const div = container.querySelector('.blogDetails')
    expect(div).not.toHaveStyle('display: none')
    const blogUrl  = container.querySelector('.blogUrl')
    const blogLikes  = container.querySelector('.blogLikes')

    expect(blogUrl).toBeInTheDocument()
    expect(blogLikes).toBeInTheDocument()

  })
})


describe('<Blog likes />', () => {

  /**
   * Make a test, which checks that the blog's URL and number of likes are shown when the button controlling the shown details has been clicked.
   */
  test('If the like button is clicked twice, props call twice', async () => {
    // blog require blog's id

    const blog = {
      author: 'Component testing is done with react-testing-library',
      title: 'title01',
      url: 'test.com',
      likes: 0,
      id: 1
    }

    const mockHandler = jest.fn()
    render(<Blog blog={blog} likeUpdate={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })

})