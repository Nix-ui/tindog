import { initRouter } from "./routes/routes";

document.addEventListener('DOMContentLoaded', ()=>{
  initRouter();
  window.addEventListener('route-changed', (e) => {
    const route = e.detail;
    if(route === 'mypets') return; 
  });
});

document.addEventListener('view-details', (id) => {
  const petId = id.detail;
  window.location.href = `/pet/${petId}`;
  
});
