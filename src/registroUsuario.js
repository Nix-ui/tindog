

const usuarios = [];


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function registrarUsuario({ email, password }) {

  if (!email || !password) {
    return { exito: false, mensaje: "Email y password son obligatorios" };
  }

 
  if (!emailRegex.test(email)) {
    return { exito: false, mensaje: "Ingrese un correo válido" };
  }

  
  const existe = usuarios.find((u) => u.email === email);
  if (existe) {
    return { exito: false, mensaje: "El usuario ya existe" };
  }

  usuarios.push({ email, password });
  return { exito: true, mensaje: "Registro exitoso" };
}
