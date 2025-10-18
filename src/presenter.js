import router from "./routes/routes";

document.addEventListener('DOMContentLoaded', ()=>{
  router.init();
});

document.addEventListener('view-details', (id) => {
  const petId = id.detail;
  window.location.href = `/pet/${petId}`;
});
