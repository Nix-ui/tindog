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

 // ATDD – Prueba 2: email repetido
  it("muestra un error si el email ya está registrado", () => {
    const email = `test-${Date.now()}@example.com`; // evita conflictos entre tests
    const password = "1234";

    // Primer registro
    cy.get("#email").clear().type(email);
    cy.get("#password").clear().type(password);
    cy.get("#register-user-button").click();

    cy.get("#register-user-message")
      .should("be.visible")
      .and("contain", "Registro exitoso");

    // Segundo registro con el mismo email
    cy.get("#email").clear().type(email);
    cy.get("#password").clear().type("5678");
    cy.get("#register-user-button").click();

    cy.get("#register-user-message")
      .should("be.visible")
      .and("contain", "El usuario ya existe");
  });

});
