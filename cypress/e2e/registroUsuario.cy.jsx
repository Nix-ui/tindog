describe("Registro de Usuario", () => {
  beforeEach(() => {
    // Cambia esta URL a la ruta donde está tu formulario
    cy.visit("/registeruser");
  });

  it("Debería mostrar el formulario de registro", () => {
    cy.get("#register-user-form").should("be.visible");
  });

  it("Debería registrar un usuario con email y password válidos", () => {
    cy.get("#email").clear().type("test@example.com", { force: true });
    cy.get("#password").clear().type("Password123", { force: true });
    cy.get("#register-user-button").click({ force: true });

    // Verifica que aparezca el mensaje de éxito
    cy.get("#register-user-message").should("contain", "Registro exitoso");
  });
});
