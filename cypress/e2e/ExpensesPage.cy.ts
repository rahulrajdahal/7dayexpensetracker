describe('Test Expenses Page', () => {
  it("should visit Expenses Page and tests it's contents", () => {
    cy.visit('/')

    cy.url().should('include', '/expenses')
    cy.get('.text-4xl').should('contain.text', 'Expenses')
    cy.contains('Top Expenses').should('contain.text', 'Top Expenses')
    cy.contains("Today's Expenses").should('contain.text', "Today's Expenses")
  })

  it('should add expense', () => {
    cy.visit('/')

    cy.contains('Add Expense').should('contain.text', 'Add Expense')
    cy.contains('Add Expense').click()

    cy.get('.gap-3>:nth-child(1)>.flex').should('be.visible')
    cy.get('.gap-3>:nth-child(1)>.flex').type('New Category Expense')
    cy.get(':nth-child(1)>.flex>.shadow-violet7').should('contain.value', 'New Category Expense')

    cy.get('.gap-3>:nth-child(2)>.flex').should('be.visible')
    cy.get('.gap-3>:nth-child(2)>.flex').type('New Category Expense description')
    cy.get(':nth-child(2)>.flex>.shadow-violet7').should('contain.value', 'New Category Expense description')

    cy.get('.gap-3>:nth-child(3)>.flex').should('be.visible')
    cy.get('.gap-3>:nth-child(3)>.flex').type('1200')
    cy.get(':nth-child(3)>.flex>.shadow-violet7').should('contain.value', '1200')


    cy.get('.mt-6').should('contain.text', 'Add Expense')
    cy.get('.mt-6').click()


    cy.get(':nth-child(5) > :nth-child(1) > .w-full > :nth-child(2) > .font-semibold').should('contain.text', 'New Category Expense')


  })
})