describe('Blog list', () => {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Anh Nguyen',
      username: 'anhng',
      password: 'monkute'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('login form displayed by default', () => {
    cy.contains('Log in to application')
    cy.get('#login-form').should('exist')
    cy.get('#login-button').should('exist')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('anhng')
      cy.get('#password').type('monkute')
      cy.get('#login-button').click()

      cy.contains('Anh Nguyen logged in')
    })

    it('fail with wrong credentials', function() {
      cy.get('#username').type('anhng')
      cy.get('#password').type('monkut')
      cy.get('#login-button').click()

      cy.get('.info').should('contain', 'error: wrong name or password')
      cy.get('.info').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function(){
    beforeEach(function() {
      cy.login({ username: 'anhng', password: 'monkute' })
    })

    it('a blog can be created', function() {
      cy.get('#create').click()
      cy.get('#title').should('be.visible', { timeout: 10000 }).type('a new blog created by cypress')
      cy.get('#author').should('be.visible', { timeout: 10000 }).type('Anh Nguyen')
      cy.get('#url').should('be.visible', { timeout: 10000 }).type('localhost')
      cy.get('#form-button').click()
      cy.contains('a new blog created by cypress')
    })

    describe('user interact with blog', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'testing content',
          author: 'Anh Nguyen',
          url: 'localhost'
        })
      })

      it('user can like blog', function() {
        cy.contains('testing content')
        cy.contains('View').click()
        cy.get('#blog-like').should('have.text', 'likes: 0')
        cy.get('#like-button').click()
        cy.get('#blog-like').should('have.text', 'likes: 1')
      })

      it('User can delete blog', function() {
        cy.contains('testing content')
        cy.contains('View').click()
        cy.get('#delete-button').click()
        cy.contains('testing content').should('not.exist')
      })
    })

    describe('other user can not delete other post', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'testing content',
          author: 'Anh Nguyen',
          url: 'localhost'
        })
        cy.contains('Log out').click()
        const user2 = {
          name: 'Test',
          username: 'test',
          password: 'monkute'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
        cy.visit('')
        cy.login({ username: 'test', password: 'monkute' })
      })

      it.only('other can not see delete button', function() {
        cy.contains('testing content')
        cy.contains('View').click()
        cy.contains('#delete-button').should('not.exist')
      })
    })
    describe('Sort blog by likes', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'testing content',
          author: 'Anh Nguyen',
          url: 'localhost'
        })
        cy.createBlog({
          title: 'testing content2',
          author: 'Anh Nguyen',
          url: 'localhost'
        })
      })

      it.only('sort by like', function() {
        cy.contains('testing content2').parent().find('#view-button').click()
        cy.get('div.expandContent#expand-content button:nth-child(2)').eq(1).click()
        cy.get('.blog').eq(0).should('contain', 'testing content2')
        cy.get('.blog').eq(1).should('contain', 'testing content')
      })
    })
  })
})