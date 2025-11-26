describe("Proceso de adopción de mascotas", () => {
  const PET_ID = "5";
  const startButtonSelector = (id) => `#start-adoption-${id}`;
  const petCardSelector = (id) => `#pet-card-${id}`;
  const viewDetailsSelector = (id) => `#view-pet-details-${id}`;
  const petDetailCardSelector = (id) => `#pet-detail-card-${id}`;
    beforeEach(() => {
    cy.visit("/");
  });

  it("Debería mostrar el boton para iniciar adopción en la tarjeta de la mascota", () => {

    cy.get(".pet-card").should("have.length.greaterThan", 0);

     cy.get(startButtonSelector(PET_ID))
      .should("exist")
      .and("have.attr", "data-action", "start-adoption")
      .and("contain", "Iniciar Proceso de Adopción");
  });

  it("Debería mostrar el mensaje 'En proceso de adopción' después de iniciar el proceso", () => {
  cy.visit('/');

  cy.get(startButtonSelector(PET_ID)).click();

  cy.get(petCardSelector(PET_ID))
    .find(".adoption-badge")
    .should("exist")
    .and("contain", "En proceso de adopción");
});

it("Debería mostrar el botón de cancelar adopción después de iniciar el proceso", () => {

  cy.get(startButtonSelector(PET_ID)).as("adoptBtn");

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

  cy.get(startButtonSelector(PET_ID)).as("adoptBtn");


  cy.get("@adoptBtn").click();

  cy.get(petCardSelector(PET_ID))
    .find(".adoption-badge")
    .should("exist")
    .and("contain", "En proceso de adopción");


  cy.get("@adoptBtn").click();

  cy.get(petCardSelector(PET_ID))
    .find(".adoption-badge")
    .should("not.exist");


  cy.get(startButtonSelector(PET_ID))
    .should("have.attr", "data-action", "start-adoption")
    .and("contain", "Iniciar Proceso de Adopción");
});

it("Debería permitir cancelar la adopción después de ver los detalles y volver", () => {
  cy.visit('/');

  cy.get(startButtonSelector(PET_ID)).as("adoptBtn");


  cy.get("@adoptBtn").click();

  cy.get(viewDetailsSelector(PET_ID)).click();
  cy.get(petDetailCardSelector(PET_ID)).should("be.visible");

  cy.get(".pet-detail-close").click();

  cy.get(startButtonSelector(PET_ID))
    .should("have.attr", "data-action", "cancel-adoption")
    .and("contain", "Cancelar proceso");

  cy.get(startButtonSelector(PET_ID)).click();


  cy.get(petCardSelector(PET_ID))
    .should("not.contain", "En proceso de adopción");


  cy.get(startButtonSelector(PET_ID))
    .should("have.attr", "data-action", "start-adoption")
    .and("contain", "Iniciar Proceso de Adopción");
});

});