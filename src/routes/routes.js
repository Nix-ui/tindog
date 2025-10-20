import myPetsTemplate from "../pages/mypets";
import registerPetTemplate from "../pages/registerPet";
import searchPetTemplate from "../pages/searchPet";
import NavBar from "../components/core/navBar";

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
  },
  searchpet: {
    route: '/searchpet',
    component: 'SearchPet',
    template: () => searchPetTemplate(),
    hasNavbar: true
  },
  hello: {
    route: '/hello',
    component: 'Hello',
    hasNavbar: true,
    template: () => `<h1>Hello World</h1>`
  }
};

class Router {
  constructor(routes, appContainer) {
    this.routes = routes;
    this.appContainer = appContainer;
    this.navbar = new NavBar(document.querySelector('.tindog-nav'), [
      { path: 'mypets', label: 'Mis mascotas' },
      { path: 'registerpet', label: 'Registrar mascota' },
      { path: 'searchpet', label: 'Buscar por raza' }
    ]);
  }

  init() {
    this.appContainer.addEventListener('click', (e) => {
      const link = e.target.closest('[data-route]');
      if (link) {
        e.preventDefault();
        const routeKey = link.getAttribute('data-route');
        this.navigateTo(routeKey);
      }
    });

    window.addEventListener('popstate', () => {
      const currentPath = window.location.pathname;
      const routeKey = this.getRouteKeyByPath(currentPath);
      this.render(routeKey || 'mypets');
    });

    const initialPath = window.location.pathname;
    const initialRoute = this.getRouteKeyByPath(initialPath) || 'mypets';
    this.render(initialRoute);
  }

  navigateTo(routeKey) {
    const route = this.routes[routeKey];
    if (!route) {
      throw new Error(`Ruta "${routeKey}" no encontrada`);
    }

    window.history.pushState({}, '', route.route);
    this.render(routeKey);
  }

  render(routeKey) {
    const route = this.routes[routeKey];
    if (!route) {
      this.appContainer.innerHTML = `<h2>Error 404: Ruta "${routeKey}" no encontrada</h2>`;
      return;
    }

    if (route.hasNavbar) {
      this.appContainer.innerHTML = `
        ${this.navbar.getTemplate()}
        <main id="page-content">${route.template()}</main>
      `;
      this.navbar.render();
    } else {
      this.appContainer.innerHTML = route.template();
    }

    window.dispatchEvent(new CustomEvent('route-changed', { detail: routeKey }));
  }

  getRouteKeyByPath(path) {
    const cleanPath = path.replace(/\/$/, ''); 
    return Object.keys(this.routes).find(key => this.routes[key].route === cleanPath);
  }
}

const router = new Router(routes, document.getElementById('app-container'));
export default router;