// ATDD – Prueba 1: formulario visible

describe("Registro de Usuario", () => {
  beforeEach(() => {
    cy.visit("/registeruser"); // ajustamos después si tu ruta es distinta
  });

  it("muestra el formulario de registro", () => {
    cy.get("#register-user-form").should("be.visible");
    cy.get("#email").should("be.visible");
    cy.get("#password").should("be.visible");
    cy.get("#register-user-button").should("be.visible");
  });
  
  it("registra un usuario con email y password válidos", () => {
  cy.get("#email").clear().type("test@example.com");
  cy.get("#password").clear().type("1234");
  cy.get("#register-user-button").click();

  cy.get("#register-user-message")
    .should("be.visible")
    .and("contain", "Registro exitoso");
});

});
