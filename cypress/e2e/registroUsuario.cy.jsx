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
});
