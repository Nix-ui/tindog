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

  it("Debería mostrar el mensaje 'En proceso de adopción' después de iniciar el proceso", () => {
  cy.visit('/');

  cy.get("#start-adoption-5").click();

  cy.get("#pet-card-5")
    .find(".adoption-badge")
    .should("exist")
    .and("contain", "En proceso de adopción");
});


});