describe("Registro de Usuario", () => {
  beforeEach(() => {
    
    cy.visit("/registeruser");
  });

  it("Debería mostrar el formulario de registro", () => {
       cy.get("#register-user-form").should("be.visible");
    cy.get("#email").should("be.visible");
    cy.get("#password").should("be.visible");
    cy.get("#register-user-button").should("be.visible");
  });

  it("Debería registrar un usuario con email y password válidos", () => {
     cy.get("#email").clear().type("test@example.com");
    cy.get("#password").clear().type("Password123");
    cy.get("#register-user-button").click();

    cy.get("#register-user-message")
      .should("be.visible")
      .and("contain", "Registro exitoso");
  });
   it("debería mostrar error si el email ya existe", () => {
    // Primer registro
    cy.get("#email").clear().type("repetido@example.com");
    cy.get("#password").clear().type("Password123");
    cy.get("#register-user-button").click();

    cy.get("#register-user-message")
      .should("be.visible")
      .and("contain", "Registro exitoso");

    // Segundo intento con el mismo email
    cy.get("#email").clear().type("repetido@example.com");
    cy.get("#password").clear().type("OtraClave123");
    cy.get("#register-user-button").click();

    cy.get("#register-user-message")
      .should("be.visible")
      .and("contain", "El usuario ya existe");
  });

  it("debería mostrar error si el email es inválido", () => {
    cy.get("#email").clear().type("correoMalo");
    cy.get("#password").clear().type("Password123");
    cy.get("#register-user-button").click();

    cy.get("#register-user-message")
      .should("be.visible")
      .and("contain", "Ingrese un correo válido");
  });

  it("debería mostrar error si faltan email o password", () => {
    // Caso 1: falta email
    cy.get("#email").clear();
    cy.get("#password").clear().type("Password123");
    cy.get("#register-user-button").click();

    cy.get("#register-user-message")
      .should("be.visible")
      .and("contain", "Email y password son obligatorios");

    // Volvemos a la página para el segundo caso
    cy.visit("/registeruser");

    // Caso 2: falta password
    cy.get("#email").clear().type("otro@mail.com");
    cy.get("#password").clear();
    cy.get("#register-user-button").click();

    cy.get("#register-user-message")
      .should("be.visible")
      .and("contain", "Email y password son obligatorios");
  });
});

