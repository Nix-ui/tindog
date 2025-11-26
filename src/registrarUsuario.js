// src/registrarUsuario.js

// ─── Dominio: Reglas de negocio puras ──────────────────────────────────────────

function isEmpty(value) {
  return !value || value.trim().length === 0;
}

function isValidEmailFormat(email) {
  // expresión simple, suficiente para este caso
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Construye la respuesta estándar que espera tu UI
function buildResult({ exito, mensaje }) {
  return { exito, mensaje };
}

// ─── Puerto de persistencia (interfaz) ─────────────────────────────────────────

function createUserRepository(storageKey = "tindog-users") {
  const getAll = () => {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : [];
  };

  const saveAll = (users) => {
    window.localStorage.setItem(storageKey, JSON.stringify(users));
  };

  const existsByEmail = (email) => {
    return getAll().some((u) => u.email === email);
  };

  const save = ({ email, password }) => {
    const users = getAll();
    users.push({ email, password });
    saveAll(users);
  };

  return {
    existsByEmail,
    save,
  };
}

// ─── Caso de uso: registrar usuario (aplicación) ───────────────────────────────

function createRegisterUserUseCase({ userRepository }) {
  return function registerUser({ email, password }) {
    // 1. Validaciones de entrada
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

    // 2. Reglas de negocio
    if (userRepository.existsByEmail(email)) {
      return buildResult({
        exito: false,
        mensaje: "El usuario ya existe",
      });
    }

    // 3. Persistencia
    userRepository.save({ email, password });

    // 4. Respuesta de éxito
    return buildResult({
      exito: true,
      mensaje: "Registro exitoso",
    });
  };
}

// ─── Fachada pública que usa el resto del sistema ─────────────────────────────

// Repositorio real (usa localStorage) para la app
const userRepository = createUserRepository();

// Esta es la función que usa tu página registerUser.js
export const registrarUsuario = createRegisterUserUseCase({ userRepository });

// Exponemos también las fábricas para poder testear con un repo en memoria
export { createUserRepository, createRegisterUserUseCase };
