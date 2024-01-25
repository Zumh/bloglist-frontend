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
      // Verify that users can like a blog post.
      it('should allow users to like a blog post', function() {
        // Locate the blog post with the title 'title1'
        cy.contains('title1').parent().as('blogPost')

        // Click on the 'view' button to see the full blog post
        cy.get('@blogPost').contains('view').click()

        // Click on the 'like' button to register a like
        cy.get('@blogPost').contains('like').click()

        // Confirm that the like count has increased to 1
        cy.get('@blogPost').contains('likes: 1')
      })

    })



    describe('blogs exist', function() {
      beforeEach(function() {
        cy.contains('create new').click()
        cy.createBlog({ title: 'title1', author: 'author1', url: 'url1' })
        cy.createBlog({ title: 'title2', author: 'author2', url: 'url2' })
        cy.createBlog({ title: 'title3', author: 'author3', url: 'url3' })

      })

      // Make a test for ensuring that only the creator can see the delete button of a blog, not anyone else.
      it('only the creator can see their remove button of a blog', function() {

        cy.logout()
        cy.createUser({ name: 'user1', username: 'user1', password: 'password1' })

        cy.login({ username: 'user1', password: 'password1' })

        // get all the blog posts by user1 and check for remove button that created by the other user
        cy.contains('title1').parent().as('blogPost')
        cy.get('@blogPost').contains('view').click()
        cy.get('@blogPost').contains('remove').should('not.exist')

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

      // Make a test that checks that the blogs are ordered according to likes with the blog with the most likes being first.
      it('blogs are ordered according to likes', function() {


        const blogTitles = ['title3', 'title2', 'title1']
        const likeCounts = [3, 2, 1]

        // Iterate through each blog title
        blogTitles.forEach((title, index) => {
          // Locate the blog post with the title
          cy.contains(title).parent().as('blogPost')
          // Click on the 'view' button to see the full blog post
          cy.get('@blogPost').contains('view').click()
          // Get the initial like count
          cy.get('@blogPost').contains('likes:').invoke('text').then((initialLikeCount) => {


            // Click on the 'like' button to register a like
            for (let i = 0; i < likeCounts[index]; i++) {
              cy.get('@blogPost').contains('like').click().wait(1000)
            }

            // Wait for the like count to update
            // Add appropriate wait condition based on your application
            cy.wait(2000)

            // Get the updated like count
            cy.get('@blogPost').contains('likes:').invoke('text').then((updatedLikeCount) => {
              // Convert string to number for comparison
              const initialCount = parseInt(initialLikeCount.match(/\d+/)[0])
              const updatedCount = parseInt(updatedLikeCount.match(/\d+/)[0])

              // Confirm that the like count has increased by the expected amount
              expect(updatedCount).to.equal(initialCount + likeCounts[index])
            })
          })
        })


        // check if the blog with the most likes is first
        cy.get('.blog').eq(0).should('contain', 'title3')
        cy.get('.blog').eq(1).should('contain', 'title2')
        cy.get('.blog').eq(2).should('contain', 'title1')
      })


    })

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




})