describe('Proceso de Adopción', () => {
  it('Debería mostrar los botones "Contáctame" en las tarjetas', () => {
    cy.visit('/');
    cy.get('[data-action="contact"]').should('exist');
  });
});
