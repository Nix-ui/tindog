import router from "./routes/routes.js";
import { initRegisterUserPage } from "./pages/registerUser"; 
document.addEventListener('DOMContentLoaded', () => {
  router.init();
});

// Navigate to pet detail page
document.addEventListener('view-details', (id) => {
  const petId = id.detail;
  window.location.href = `/pet/${petId}`;
});

// Navigate to breed search page
document.addEventListener('search-by-breed', () => {
  router.navigateTo('searchpet');
});


window.addEventListener("route-changed", (event) => {
  const routeKey = event.detail;

  if (routeKey === "registeruser") {
    initRegisterUserPage();
  }

 
});
