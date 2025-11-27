export function isEmpty(value) {
  return !value || value.trim().length === 0;
}

export function isValidEmailFormat(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function buildResult({ exito, mensaje }) {
  return { exito, mensaje };
}
