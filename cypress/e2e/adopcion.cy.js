describe("Proceso de adopción de mascotas", () => {

  // 1) Estado inicial del botón
  it("Debería mostrar el botón de iniciar adopción", () => {
    cy.visit('/');

    cy.get(".pet-card").should("have.length.greaterThan", 0);

    cy.get("#start-adoption-5")
      .should("exist")
      .and("have.attr", "data-action", "start-adoption")
      .and("contain", "Iniciar Proceso de Adopción");
  });

});