import { registrarUsuario } from "../registroUsuario.js";

describe("Función registrarUsuario", () => {

  beforeEach(() => {
    // Reiniciar usuarios antes de cada test
    while (registrarUsuario.usuarios?.length) {
      registrarUsuario.usuarios.pop();
    }
  });

  test("Debería registrar un usuario con email y password válidos", () => {
    const resultado = registrarUsuario({ email: "test@mail.com", password: "1234" });
    expect(resultado.exito).toBe(true);
    expect(resultado.mensaje).toBe("Registro exitoso");
  });

  test("Debería fallar si el email ya existe", () => {
    registrarUsuario({ email: "test@mail.com", password: "1234" });
    const resultado = registrarUsuario({ email: "test@mail.com", password: "abcd" });
    expect(resultado.exito).toBe(false);
    expect(resultado.mensaje).toBe("El usuario ya existe");
  });

  test("Debería fallar si email no es válido", () => {
    const resultado = registrarUsuario({ email: "noemail", password: "1234" });
    expect(resultado.exito).toBe(false);
    expect(resultado.mensaje).toBe("Ingrese un correo válido");
  });

  test("Debería fallar si email o password están vacíos", () => {
    const resultado = registrarUsuario({ email: "", password: "" });
    expect(resultado.exito).toBe(false);
    expect(resultado.mensaje).toBe("Email y password son obligatorios");
  });

});
