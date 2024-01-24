describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Edsger W. Dijkstra',
      username: 'Edsger',
      password: 'johndoe'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })


  it('Login form is shown', function() {
    cy.contains('Blogs')
    cy.contains('Blog app, Department of Computer Science, University of Helsinki 2024')

  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Edsger')
      cy.get('#password').type('johndoe')
      cy.get('#login-btn').click()
      cy.contains('Edsger W. Dijkstra logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Edsger')
      cy.get('#password').type('joe')
      cy.get('#login-btn').click()
      cy.get('.error').contains('invalid username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function() {

    beforeEach(function() {
      cy.login({ username: 'Edsger', password: 'johndoe' })

    })

    // Make a test that verifies a logged-in user can create a new blog.
    // The test has to ensure that a new blog is added to the list of all blogs.
    // check if the blog is added to the list of all blogs.
    it('a new blog can be created', function() {

      cy.contains('create new').click()
      cy.createBlog({ title: 'title', author: 'author', url: 'url' })
      // Assertion: Check if the new blog is added to the list of all blogs.
      // Assuming that after creating a new blog, the application redirects to the main page
      cy.url().should('include', 'http://localhost:5173/')
      cy.get('.blog').should('contain', 'title')

    })

    describe('a blog exists', function() {
      beforeEach(function() {
        cy.contains('create new').click()
        cy.createBlog({ title: 'title1', author: 'author1', url: 'url1' })

      })
      // Make a test that confirms users can like a blog.
      it('a blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('title1').parent().contains('view').click()
        cy.contains('like').click()
        cy.contains('likes: 1')
      })
    })

    describe('blogs exist', function() {
      beforeEach(function() {
        cy.contains('create new').click()
        cy.createBlog({ title: 'title1', author: 'author1', url: 'url1' })
        cy.createBlog({ title: 'title2', author: 'author2', url: 'url2' })
        cy.createBlog({ title: 'title3', author: 'author3', url: 'url3' })

      })
      // Make a test for ensuring that the user who created a blog can delete it.
      it('a blog can be deleted', function() {

        // remove one blog by the user who created it
        cy.contains('title1').parent().contains('view').click()
        cy.contains('title1').parent().contains('remove').click()
        // confirm the blog is remove
        cy.get('.blog').should('not.contain', 'title1')
        cy.get('.blog').should('contain', 'title2')
        cy.get('.blog').should('contain', 'title3')
      })
    })

    // Make a test for ensuring that only the creator can see the delete button of a blog, not anyone else.
    describe('only creator can', function() {
      beforeEach(function() {
        cy.contains('create new').click()
        cy.createBlog({ title: 'title1', author: 'author1', url: 'url1' })

      })

      it('only the creator can see ther remove button of a blog', function() {

        cy.contains('title1').parent().contains('view').click()
        cy.contains('remove').should('not.exist')
      })

    })


  })


})