// src/registrarUsuario.js

// Dominio: reglas de negocio puras
function isEmpty(value) {
  return !value || value.trim().length === 0;
}

function isValidEmailFormat(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function buildResult({ exito, mensaje }) {
  return { exito, mensaje };
}

// Importamos el puerto de persistencia (infraestructura)
import { createUserRepository } from "./repository/UserRepository.js";

// Caso de uso: registrar usuario
export function createRegisterUserUseCase({ userRepository }) {
  return function registerUser({ email, password }) {
    if (isEmpty(email) || isEmpty(password)) {
      return buildResult({
        exito: false,
        mensaje: "Email y password son obligatorios",
      });
    }

    if (!isValidEmailFormat(email)) {
      return buildResult({
        exito: false,
        mensaje: "Ingrese un correo válido",
      });
    }

    if (userRepository.existsByEmail(email)) {
      return buildResult({
        exito: false,
        mensaje: "El usuario ya existe",
      });
    }

    userRepository.save({ email, password });

    return buildResult({
      exito: true,
      mensaje: "Registro exitoso",
    });
  };
}

// Fachada pública que usa el resto del sistema (UI)
const userRepository = createUserRepository();
export const registrarUsuario = createRegisterUserUseCase({ userRepository });
