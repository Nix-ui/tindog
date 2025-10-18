import myPetsTemplate from "../pages/mypets";
import registerPetTemplate from "../pages/registerPet";

const routes = {
    mypets: {
        route: '/mypets',
        component: 'MyPets',
        template: myPetsTemplate,
        hasNavbar: true
    },
    registerpet: {
        route: '/registerpet',
        component: 'RegisterPet',
        template: () => registerPetTemplate(),
        hasNavbar: true
    }
}

export function initRouter() {
    const appContainer = document.getElementById('app-container');
    
    document.querySelectorAll('[data-route]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const route = e.target.getAttribute('data-route');
            navigateTo(route);
        });
    });

    function navigateTo(route) {
        // Ejecutar el template como función
        appContainer.innerHTML = routes[route].template();
        window.dispatchEvent(new CustomEvent('route-changed', { 
            detail: route 
        }));
    }

    navigateTo('mypets');
}