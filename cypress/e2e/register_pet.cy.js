describe('Registro de mascota', () => {
  beforeEach(() => {
    cy.visit('/index.html');
  });

  it('Registra mascota con datos válidos', () => {
    cy.get('input[name="name"]').type('Firulais');
    cy.get('input[name="age"]').type('2');
    cy.get('input[name="breed"]').type('Labrador');
    cy.get('input[name="ownerId"]').type('user123');
    cy.get('button[type="submit"]').click();
    cy.contains('¡Mascota registrada con éxito!').should('be.visible');
  });
});