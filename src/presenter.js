import router from "./routes/routes.js";
import { registerAdoptionPresenter } from "./presenter/AdoptionPresenter.js";

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

document.addEventListener('DOMContentLoaded', () => {
  const CardGenerator = window.cardGenerator;
  registerAdoptionPresenter(CardGenerator);
});