// src/registrarUsuario.test.js
import { registrarUsuario, usuarios } from "./registroUsuario.js";

describe("Función registrarUsuario", () => {
  // Reiniciar usuarios antes de cada test
  beforeEach(() => {
    usuarios.length = 0;
  });

  test("Registrar un usuario con email y password válidos", () => {
    const resultado = registrarUsuario({
      email: "test@mail.com",
      password: "1234",
    });

    expect(resultado.exito).toBe(true);
    expect(resultado.mensaje).toBe("Registro exitoso");
    expect(usuarios.length).toBe(1);
    expect(usuarios[0].email).toBe("test@mail.com");
  });

  test("Falla si el email ya existe", () => {
    registrarUsuario({ email: "test@mail.com", password: "1234" });

    const resultado = registrarUsuario({
      email: "test@mail.com",
      password: "abcd",
    });

    expect(resultado.exito).toBe(false);
    expect(resultado.mensaje).toBe("El usuario ya existe");
    expect(usuarios.length).toBe(1);
  });

  test("Falla si faltan email o password", () => {
    const r1 = registrarUsuario({ email: "", password: "1234" });
    const r2 = registrarUsuario({ email: "a@a.com", password: "" });

    expect(r1.exito).toBe(false);
    expect(r1.mensaje).toBe("Email y password son obligatorios");

    expect(r2.exito).toBe(false);
    expect(r2.mensaje).toBe("Email y password son obligatorios");
  });

  test("Falla si el email es inválido", () => {
    const resultado = registrarUsuario({
      email: "correoMalo",
      password: "1234",
    });

    expect(resultado.exito).toBe(false);
    expect(resultado.mensaje).toBe("Ingrese un correo válido");
  });
});
