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
