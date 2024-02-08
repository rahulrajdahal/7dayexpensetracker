import Input from './Input';

describe('<FormModal />', () => {
  const email = 'test@email.com';

  it('renders', () => {
    cy.mount(<Input name={'email'} label='Email' />);

    cy.get('.shadow-violet7').should('be.visible');
    cy.get('.shadow-violet7').type(email);

    cy.get('.text-right').should('contain.text', 'Email');
    cy.get('.shadow-violet7').should('contain.value', email);
  });
});
