// src/registrarUsuario.js

export const usuarios = [];

export function registrarUsuario({ email, password }) {

  if (email === "" || password === "") {
    return {
      exito: false,
      mensaje: "Email y password son obligatorios",
    };
  }

   // 2. Validación mínima de formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      exito: false,
      mensaje: "Ingrese un correo válido",
    };
  }

  
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
