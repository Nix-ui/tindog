// src/registrarUsuario.js

export const usuarios = [];

export function registrarUsuario({ email, password }) {
  // 1. Verificar si el email ya existe
  const existe = usuarios.find((u) => u.email === email);

  if (existe) {
    return {
      exito: false,
      mensaje: "El usuario ya existe",
    };
  }

  // 2. Si no existe, registrar el usuario
  usuarios.push({ email, password });

  return {
    exito: true,
    mensaje: "Registro exitoso",
  };
}
