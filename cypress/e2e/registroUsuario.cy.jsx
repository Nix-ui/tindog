describe("Registro de Usuario", () => {
  beforeEach(() => {
    
    cy.visit("/registeruser");
  });

  it("Debería mostrar el formulario de registro", () => {
    cy.get("#register-user-form").should("be.visible");
  });

  it("Debería registrar un usuario con email y password válidos", () => {
    cy.get("#email").clear().type("test@example.com", { force: true });
    cy.get("#password").clear().type("Password123", { force: true });
    cy.get("#register-user-button").click({ force: true });

   
    cy.get("#register-user-message").should("contain", "Registro exitoso");
  });
});

