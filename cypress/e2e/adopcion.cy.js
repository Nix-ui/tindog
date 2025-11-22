describe("Proceso de adopción de mascotas", () => {

 
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

it("Debería mostrar el botón de cancelar adopción después de iniciar el proceso", () => {
  cy.visit('/');

  cy.get("#start-adoption-5").as("adoptBtn");

  cy.get("@adoptBtn")
    .should("have.attr", "data-action", "start-adoption")
    .and("contain", "Iniciar Proceso de Adopción");

  
  cy.get("@adoptBtn").click();


  cy.get("@adoptBtn")
    .should("have.attr", "data-action", "cancel-adoption")
    .and("contain", "Cancelar proceso");
});

it("Debería eliminar el badge 'En proceso de adopción' después de cancelar el proceso", () => {
  cy.visit('/');

  cy.get("#start-adoption-5").as("adoptBtn");


  cy.get("@adoptBtn").click();

  cy.get("#pet-card-5")
    .find(".adoption-badge")
    .should("exist")
    .and("contain", "En proceso de adopción");


  cy.get("@adoptBtn").click();

  cy.get("#pet-card-5")
    .find(".adoption-badge")
    .should("not.exist");


  cy.get("#start-adoption-5")
    .should("have.attr", "data-action", "start-adoption")
    .and("contain", "Iniciar Proceso de Adopción");
});



});