describe('PetSearch Feature', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  beforeEach(() => {
    cy.visit('/searchpet');
  });

  it('carga el dropdown de razas', () => {
    cy.get('#breed-select', { timeout: 5000 })
      .should('exist')
      .find('option')
      .its('length')
      .should('be.greaterThan', 0);
  });

});