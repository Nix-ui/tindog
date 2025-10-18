import { initRouter } from "./routes/routes";

document.addEventListener('DOMContentLoaded', ()=>{
  initRouter();
  window.addEventListener('route-changed', (e) => {
    const route = e.detail;
    if(route === 'mypets') return; 
  });
});
