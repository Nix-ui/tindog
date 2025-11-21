// src/registrarUsuario.js

export const usuarios = [];

export function registrarUsuario({ email, password }) {

  // 🔴 CÓDIGO MÍNIMO PARA PASAR EL TEST 3
  if (email === "" || password === "") {
    return {
      exito: false,
      mensaje: "Email y password son obligatorios",
    };
  }

  // Código anterior (no tocar)
  const existe = usuarios.find((u) => u.email === email);

  if (existe) {
    return {
      exito: false,
      mensaje: "El usuario ya existe",
    };
  }

  usuarios.push({ email, password });

  return {
    exito: true,
    mensaje: "Registro exitoso",
  };
}
