describe('Test Expenses Page', () => {
  it("should visit Expenses Page and tests it's contents", () => {
    cy.visit('/expenses')

    cy.url().should('include', '/expenses')
    cy.get('.text-4xl').should('contain.text', 'Expenses')
    cy.contains('Top Expenses').should('contain.text', 'Top Expenses')
    cy.contains("Today's Expenses").should('contain.text', "Today's Expenses")
  })

  it('should add expense', () => {
    const title = `New Category Expense ${Math.floor(Math.random() * 100)}`


    cy.visit('/expenses')

    cy.contains('Add Expense').should('contain.text', 'Add Expense')
    cy.contains('Add Expense').click()

    cy.get('.gap-3>:nth-child(1)>.flex').should('be.visible')
    cy.get('.gap-3>:nth-child(1)>.flex').type(title.toLowerCase())
    cy.get(':nth-child(1)>.flex>.shadow-violet7').should('contain.value', title.toLowerCase())

    cy.get('.gap-3>:nth-child(2)>.flex').should('be.visible')
    cy.get('.gap-3>:nth-child(2)>.flex').type(`New Category Expense description for - ${title.toLowerCase()}`)
    cy.get(':nth-child(2)>.flex>.shadow-violet7').should('contain.value', `New Category Expense description for - ${title.toLowerCase()}`)

    cy.get('.gap-3>:nth-child(3)>.flex').should('be.visible')
    cy.get('.gap-3>:nth-child(3)>.flex').type('1200')
    cy.get(':nth-child(3)>.flex>.shadow-violet7').should('contain.value', '1200')


    cy.get('.mt-6').should('contain.text', 'Add Expense')
    cy.get('.mt-6').click()


    cy.get(':nth-child(5) > :nth-child(1) > .w-full > :nth-child(2) > .font-semibold').should('contain.text', title.toLowerCase())


  })
})