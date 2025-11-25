// src/pages/registerUser.js
import router from "../routes/routes.js";
import { registrarUsuario } from "../registrarUsuario";

export default function registerUserTemplate() {
  return `
    <section class="tindog-page">
      <div 
        class="tindog-container flex justify-center items-center" 
        style="min-height: 80vh;"
      >
        <div class="card max-w-md w-full register-form">

          <!-- Logo / Icono -->
          <div class="card-header" style="text-align: center;">
            <div style="font-size: 40px; margin-bottom: 0.75rem;">🐾</div>
            <h1 
              class="card-title" 
              style="font-size: 1.5rem; margin-bottom: 0.25rem; color: #6b4cc2;"
            >
              Tindog
            </h1>
            <p class="card-description">
              Conecta refugios con familias amorosas
            </p>
          </div>

          <div class="card-content">
            <form id="register-user-form" class="flex flex-col gap-4">
              
              <div class="form-group">
                <label for="email" class="form-label">Correo electrónico</label>
                <input
                  id="email"
                  type="email"
                  class="form-input"
                  placeholder="tu@email.com"
                />
              </div>

              <div class="form-group">
                <label for="password" class="form-label">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  class="form-input"
                  placeholder="••••••••"
                />
              </div>

              <button
                id="register-user-button"
                type="button"
                class="btn btn-primary w-full"
              >
                Registrarme
              </button>

              <p
                id="register-user-message"
                style="
                  margin-top: 0.5rem;
                  font-size: 0.875rem;
                  text-align: center;
                "
              ></p>

              <p
                style="
                  margin-top: 0.75rem;
                  font-size: 0.875rem;
                  text-align: center;
                "
              >
                ¿Ya tienes cuenta?
                <span
                  id="go-to-login"
                  style="color: var(--tindog-indigo); font-weight: 500; cursor: pointer;"
                >
                  Inicia sesión
                </span>
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  `;
}

export function initRegisterUserPage() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const button = document.getElementById("register-user-button");
  const messageEl = document.getElementById("register-user-message");
  const loginLink = document.getElementById("go-to-login");

  button.addEventListener("click", () => {
    const resultado = registrarUsuario({
      email: emailInput.value.trim(),
      password: passwordInput.value.trim(),
    });

    // Mostrar mensaje
    messageEl.textContent = resultado.mensaje;

    // Colores de feedback visual
    messageEl.style.color = resultado.exito
      ? "#6b4cc2"  // moradito éxito
      : "#e63946"; // rojo error

    // Si el registro fue exitoso, pasamos a la siguiente página (buscar mascota)
    if (resultado.exito) {
      setTimeout(() => {
        router.navigateTo("searchpet"); // aquí se va a la página de buscar mascota
      }, 800);
    }
  });

  // Link "Inicia sesión"
  if (loginLink) {
    loginLink.addEventListener("click", () => {
      // De momento lo dejamos yendo a la misma pantalla de registro
      // Cuando tengas una pantalla de login, cambias "registeruser" por "login"
      router.navigateTo("registeruser");
    });
  }
}
