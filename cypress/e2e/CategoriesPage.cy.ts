describe('Test Categories Page', () => {
  it('should visit Categories Page and tests contents', () => {
    cy.visit('/categories')

    cy.url().should('include', '/categories')
    cy.get('.text-4xl').should('contain.text', 'Category')
    cy.contains('Your Categories').should('contain.text', 'Your Categories')
    cy.contains("Top Expenses By Category").should('contain.text', "Top Expenses By Category")
  })

  it('should add category', () => {
    const title = `New Category ${Math.floor(Math.random() * 100)}`

    cy.visit('/categories')

    cy.contains('Add Category').should('contain.text', 'Add Category')
    cy.contains('Add Category').click()

    cy.get(':nth-child(1)>.flex>.shadow-violet7').should('be.visible')
    cy.get(':nth-child(1)>.flex>.shadow-violet7').type(title.toLowerCase())
    cy.get(':nth-child(1)>.flex>.shadow-violet7').should('contain.value', title.toLowerCase())

    cy.get(':nth-child(2)>.flex>.shadow-violet7').should('be.visible')
    cy.get(':nth-child(2)>.flex>.shadow-violet7').type('Nhouse')
    cy.get('[data-unified="1f3d8-fe0f"]>.epr-emoji-img').click()
    cy.get(':nth-child(2)>.flex>.shadow-violet7').should('contain.value', '🏘️')

    cy.get('.mt-6').should('contain.text', 'Add Category')
    cy.get('.mt-6').click()


    cy.get(':nth-child(3) > :nth-child(1) > .flex > .capitalize').should('contain.text', title.toLowerCase())
    cy.get(':nth-child(3) > :nth-child(1) > .flex > .rounded-full').should('contain.text', '🏘️')
  })
})