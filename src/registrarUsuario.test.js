// PRIMER TEST TDD – aún no existe la función real

import { registrarUsuario, usuarios } from "./registrarUsuario.js";

describe("Función registrarUsuario", () => {
  beforeEach(() => {
    // limpiar la lista antes de cada prueba
    if (usuarios) {
      usuarios.length = 0;
    }
  });

  test("registra un usuario con email y password válidos", () => {
    const resultado = registrarUsuario({
      email: "test@mail.com",
      password: "1234",
    });

    expect(resultado.exito).toBe(true);
    expect(resultado.mensaje).toBe("Registro exitoso");
    expect(usuarios.length).toBe(1);
    expect(usuarios[0].email).toBe("test@mail.com");
  });
   test("no permite registrar un email repetido", () => {
    // Primer registro
    registrarUsuario({
      email: "repetido@mail.com",
      password: "1234",
    });

    // Segundo intento con el mismo email
    const resultado = registrarUsuario({
      email: "repetido@mail.com",
      password: "abcd",
    });

    expect(resultado.exito).toBe(false);
    expect(resultado.mensaje).toBe("El usuario ya existe");
    expect(usuarios.length).toBe(1); // solo debe haber un usuario
  });
});
