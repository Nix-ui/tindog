describe('Proceso de Adopción', () => {
  it('Debería mostrar los botones "Contáctame" en las tarjetas', () => {
    cy.visit('/');
    cy.get('[data-action="contact"]').should('exist');
  });

  it('No debería permitir iniciar adopción si la mascota ya está en proceso', () => {
    cy.visit('/');
    cy.get('[data-action="contact"]').first().click();
    cy.get('[data-action="contact"]').first().click();

    cy.on('window:alert', (text) => {
      expect(text).to.include('ya está en proceso');
    });
  });

  
  it('Debería abrir el modal con los detalles de la mascota', () => {
    cy.visit('/');
    cy.get('[data-action="view-details"]').first().click();
    cy.get('.pet-detail-overlay').should('be.visible');
    cy.get('.pet-detail-overlay [data-action="contact"]').should('exist');
  });

});
