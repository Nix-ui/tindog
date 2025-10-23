import React, { useState } from "react";
import { registrarUsuario } from "../registroUsuario";


export default function RegisterUserForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultado = registrarUsuario({ email, password });
    setMensaje(resultado.mensaje);
  };

  return (
    <form id="register-user-form" onSubmit={handleSubmit}>
      <input
        id="email"
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        id="password"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button id="register-user-button" type="submit">Registrarme</button>
      <p id="register-user-message">{mensaje}</p>
    </form>
  );
}
