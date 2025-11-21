import { registrarUsuario } from "../registrarUsuario";

export default function registerUserTemplate() {
  return `
    <form id="register-user-form" style="padding: 20px;">
      <h2>Registrar Usuario</h2>
      <input id="email" type="email" placeholder="Email" /><br><br>
      <input id="password" type="password" placeholder="Password" /><br><br>
      <button id="register-user-button" type="button">Registrar</button>
      <p id="register-user-message"></p>
    </form>
  `;
}
export function initRegisterUserPage() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const button = document.getElementById("register-user-button");
  const messageEl = document.getElementById("register-user-message");

  button.addEventListener("click", () => {
    const resultado = registrarUsuario({
      email: emailInput.value,
      password: passwordInput.value,
    });

    messageEl.textContent = resultado.mensaje;
  });
}
