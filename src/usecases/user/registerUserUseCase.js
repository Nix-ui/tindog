import { isEmpty, isValidEmailFormat, buildResult } from "../../domain/user/userRules.js";

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
