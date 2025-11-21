// src/registrarUsuario.js

// Base de datos simulada en memoria
export const usuarios = [];

// Función principal: Registrar Usuario
export function registrarUsuario({ email, password }) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validar email y password obligatorios
  if (!email || !password) {
    return { exito: false, mensaje: "Email y password son obligatorios" };
  }

  // Validar formato de email
  if (!emailRegex.test(email)) {
    return { exito: false, mensaje: "Ingrese un correo válido" };
  }

  // Verificar email repetido
  const existe = usuarios.find((u) => u.email === email);
  if (existe) {
    return { exito: false, mensaje: "El usuario ya existe" };
  }

  // Registrar usuario
  usuarios.push({ email, password });

  return { exito: true, mensaje: "Registro exitoso" };
}
