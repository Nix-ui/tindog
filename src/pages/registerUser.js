// src/pages/registerUser.js
import router from "../routes/routes.js";
import { registrarUsuario } from "../registrarUsuario.js";

export default function registerUserTemplate() {
  return `
    <section class="tindog-page">
      <div class="tindog-container flex justify-center items-center" style="min-height: 80vh;">
        <div class="card max-w-md w-full register-form">

          <div class="card-header" style="text-align: center;">
            <div style="font-size: 40px; margin-bottom: 0.75rem;">🐾</div>
            <h1 class="card-title" style="font-size: 1.5rem; margin-bottom: 0.25rem; color: #6b4cc2;">
              Tindog
            </h1>
            <p class="card-description">Conecta refugios con familias amorosas</p>
          </div>

          <div class="card-content">
            <form id="register-user-form" class="flex flex-col gap-4">

              <div class="form-group">
                <label for="email" class="form-label">Correo electrónico</label>
                <input id="email" type="email" class="form-input" placeholder="tu@email.com" />
              </div>

              <div class="form-group">
                <label for="password" class="form-label">Contraseña</label>
                <input id="password" type="password" class="form-input" placeholder="••••••••" />
              </div>

              <button id="register-user-button" type="button" class="btn btn-primary w-full">
                Registrarme
              </button>

              <!-- MUY IMPORTANTE: este id debe coincidir con Cypress -->
              <p
                id="register-user-message"
                style="margin-top: .5rem; font-size: .875rem; text-align: center;"
              ></p>

              <p style="margin-top: .75rem; font-size: .875rem; text-align: center;">
                ¿Ya tienes cuenta?
                <span id="go-to-login" style="color: var(--tindog-indigo); font-weight: 500; cursor: pointer;">
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

// Helpers
function showFeedbackMessage(element, { mensaje, exito }) {
  element.textContent = mensaje;
  element.style.color = exito ? "#6b4cc2" : "#e63946";
}

function navigateToLogin() {
  router.navigateTo("registeruser");
}

function navigateToSearchAfterSuccess() {
  setTimeout(() => router.navigateTo("searchpet"), 800);
}

// Inicializador
export function initRegisterUserPage() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const submitButton = document.getElementById("register-user-button");
  // TAMBIÉN IMPORTANTE: usar el mismo id aquí
  const feedbackElement = document.getElementById("register-user-message");
  const loginLink = document.getElementById("go-to-login");

  submitButton.addEventListener("click", () => {
    const result = registrarUsuario({
      email: emailInput.value.trim(),
      password: passwordInput.value.trim(),
    });

    showFeedbackMessage(feedbackElement, result);

    if (result.exito) {
      navigateToSearchAfterSuccess();
    }
  });

  if (loginLink) {
    loginLink.addEventListener("click", navigateToLogin);
  }
}
