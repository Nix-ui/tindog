describe("Registro de Usuario", () => {
  beforeEach(() => {
    // Cada test empieza limpio en la misma página
    cy.visit("/registeruser");
  });

  it("Debería mostrar el formulario de registro", () => {
    cy.get("#register-user-form").should("be.visible");
  });

  it("Debería registrar un usuario con email y password válidos", () => {
    // Inputs con force: true para evitar overlays
    cy.get("#email").clear().type("test@example.com", { force: true });
    cy.get("#password").clear().type("Password123", { force: true });
    cy.get("#register-user-button").click({ force: true });

    // Verifica que aparezca el mensaje de éxito
    cy.get("#register-user-message").should("contain", "Registro exitoso");
  });

  it("Debería mostrar error si el email ya existe", () => {
    // Primer registro para crear el usuario
    cy.get("#email").clear().type("test@example.com", { force: true });
    cy.get("#password").clear().type("Password123", { force: true });
    cy.get("#register-user-button").click({ force: true });

    // Recarga la página para limpiar el formulario
    cy.visit("/registeruser");

    // Segundo intento con el mismo email
    cy.get("#email").clear().type("test@example.com", { force: true });
    cy.get("#password").clear().type("OtraPassword456", { force: true });
    cy.get("#register-user-button").click({ force: true });

    // Verifica que aparezca el mensaje de error
    cy.get("#register-user-message").should("contain", "El usuario ya existe");
  });
});
