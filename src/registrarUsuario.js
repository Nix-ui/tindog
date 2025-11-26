// src/registrarUsuario.js

import { createRegisterUserUseCase } from "./usecases/user/registerUserUseCase.js";
import { createUserRepository } from "./infrastructure/repository/UserRepository.js";

const userRepository = createUserRepository();

export const registrarUsuario = createRegisterUserUseCase({ userRepository });
