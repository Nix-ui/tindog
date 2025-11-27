// src/registrarUsuario.test.js


import { createRegisterUserUseCase } from "./usecases/user/registerUserUseCase.js";


describe("Función registrarUsuario (caso de uso)", () => {
  let repoEnMemoria;
  let registrarUsuario;

  beforeEach(() => {
    // Repositorio en memoria para pruebas (no usa localStorage)
    repoEnMemoria = {
      _users: [],
      existsByEmail(email) {
        return this._users.some((u) => u.email === email);
      },
      save({ email, password }) {
        this._users.push({ email, password });
      },
    };

    // Caso de uso construido con nuestro repo en memoria
    registrarUsuario = createRegisterUserUseCase({
      userRepository: repoEnMemoria,
    });
  });

  test("registra un usuario con email y password válidos", () => {
    const resultado = registrarUsuario({
      email: "test@mail.com",
      password: "1234",
    });

    expect(resultado.exito).toBe(true);
    expect(resultado.mensaje).toBe("Registro exitoso");
    expect(repoEnMemoria._users.length).toBe(1);
    expect(repoEnMemoria._users[0].email).toBe("test@mail.com");
  });

  test("no permite registrar un email repetido", () => {
    // Primer registro
    registrarUsuario({
      email: "test@mail.com",
      password: "1234",
    });

    // Segundo intento con el mismo email
    const resultado = registrarUsuario({
      email: "test@mail.com",
      password: "5678",
    });

    expect(resultado.exito).toBe(false);
    expect(resultado.mensaje).toBe("El usuario ya existe");
    expect(repoEnMemoria._users.length).toBe(1); // solo debe haber un usuario
  });

  test("falla si faltan email o password", () => {
    const r1 = registrarUsuario({ email: "", password: "1234" });
    expect(r1.exito).toBe(false);
    expect(r1.mensaje).toBe("Email y password son obligatorios");

    const r2 = registrarUsuario({ email: "test@mail.com", password: "" });
    expect(r2.exito).toBe(false);
    expect(r2.mensaje).toBe("Email y password son obligatorios");
  });

  test("muestra error si el email tiene un formato inválido", () => {
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
      const res = registrarUsuario({ email, password: "1234" });
      expect(res.exito).toBe(false);
      expect(res.mensaje).toBe("Ingrese un correo válido");
    });
  });
});
