// ATDD – Prueba 1: formulario visible
describe("Registro de Usuario", () => {
  beforeEach(() => {
    cy.visit("/registeruser"); // ruta del formulario
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

    // 🔎 Si tu flujo redirige después de registrar, lo comprobamos:
    // (si no redirige, puedes comentar estas 2 líneas sin problema)
    cy.url().should("include", "/searchpet");

    // 🔁 VOLVER AL REGISTRO ANTES DEL SEGUNDO INTENTO
    cy.visit("/registeruser");

    // Segundo registro con el mismo email
    cy.get("#email").clear().type(email);
    cy.get("#password").clear().type("5678");
    cy.get("#register-user-button").click();

    cy.contains("El usuario ya existe").should("be.visible");

  });

  // ATDD – Prueba 3: campos vacíos o inválidos
  it("muestra error si email o password están vacíos", () => {
    // 1️ Email vacío
    cy.get("#email").clear();
    cy.get("#password").clear().type("1234");
    cy.get("#register-user-button").click();

    cy.get("#register-user-message")
      .should("be.visible")
      .and("contain", "Email y password son obligatorios");

    // 2️ Password vacío
    cy.get("#email").clear().type("test@example.com");
    cy.get("#password").clear();
    cy.get("#register-user-button").click();

    cy.get("#register-user-message")
      .should("be.visible")
      .and("contain", "Email y password son obligatorios");
  });

  // ATDD – Prueba 4: email con formato inválido
 it("muestra error si el email tiene un formato inválido", () => {
  const invalidEmails = [
    "correo",
    "test@",
    "@gmail.com",
    "usuario@com",
    "1234",
    "test@@gmail.com",
    "test.gmail.com",
  ];

  invalidEmails.forEach((email) => {
    cy.get("#email").clear().type(email);
    cy.get("#password").clear().type("1234");
    cy.get("#register-user-button").click();

    // En vez de buscar por id, buscamos directamente el texto del mensaje
    cy.contains("Ingrese un correo válido").should("be.visible");
  });
});
});