import { useState } from 'react';
import FormModal from './FormModal';

describe('<FormModal />', () => {
  function Modal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <FormModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        trigger={<button>Click me to open</button>}
      >
        <p>Modal Content</p>
      </FormModal>
    );
  }

  it('renders', () => {
    cy.mount(<Modal />);

    cy.get('button').should('contain.text', 'Click me to open');
    cy.get('button').click();

    cy.get('p').should('contain.text', 'Modal Content');

    cy.get('.mt-2').should('contain.text', 'Cancel');
    cy.get('.mt-2').click();
  });
});
