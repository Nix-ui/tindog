import router from "./routes/routes.js";
import { initRegisterUserPage } from "./pages/registerUser";
import { registerAdoptionPresenter } from "./presenter/AdoptionPresenter.js";

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar router
  router.init();

  // Inicializar lógica de adopciones (código de main)
  const CardGenerator = window.cardGenerator;
  if (CardGenerator) {
    registerAdoptionPresenter(CardGenerator);
  }
});

// Navigate to pet detail page
document.addEventListener("view-details", (id) => {
  const petId = id.detail;
  window.location.href = `/pet/${petId}`;
});

// Navigate to breed search page
document.addEventListener("search-by-breed", () => {
  router.navigateTo("searchpet");
});

// Inicializar página de registro de usuario cuando cambia la ruta
window.addEventListener("route-changed", (event) => {
  const routeKey = event.detail;

  if (routeKey === "registeruser") {
    initRegisterUserPage();
  }
});
