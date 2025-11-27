import myPetsTemplate from "../pages/mypets";
import registerPetTemplate from "../pages/registerPet";
import searchPetTemplate from "../pages/searchPet";
import NavBar from "../components/core/navBar";
import registerUserTemplate from "../pages/registerUser";

const routes = {
  mypets: {
    icon: 'assets/icons/mypets.png',
    name: 'Mis mascotas',
    route: '/mypets',
    component: 'MyPets',
    template: myPetsTemplate,
    hasNavbar: true
  },
  registerpet: {
    icon: 'assets/icons/register-pet.png',
    name: 'Registrar mascota',
    route: '/registerpet',
    component: 'RegisterPet',
    template: () => registerPetTemplate(),
    hasNavbar: false
  },
  searchpet: {
    icon: 'assets/icons/search-pet.png',
    name: 'Buscar mascota',
    route: '/searchpet',
    component: 'SearchPet',
    template: () => searchPetTemplate(),
    hasNavbar: true
  },
  register_user:{
    icon: 'assets/icons/register-pet.png',
    name: 'Registrar Usuario',
    route: '/register_user',
    component: 'RegisterUser',
    template: () => registerUserTemplate(),
    hasNavbar: false
  }
};

const paths=[routes.mypets.route,
  routes.registerpet.route,
  routes.searchpet.route,
  routes.register_user.route
]

class Router {
  constructor(routes, appContainer) {
    this.routes = routes;
    this.appContainer = appContainer;
    this.navbar = new NavBar(document.createElement('nav', { is: 'tindog-nav' }), [
      { path: 'mypets', label: 'Mis mascotas', id:"mypets"},
      { path: 'registerpet', label: 'Registrar mascota', id:"register-pet"},
      { path: 'searchpet', label: 'Buscar por raza',id: "search-pet"},
      { path: 'register_user', label: 'Registrar Usuario', id:"register-user"}
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
    let actualRoute = window.location.pathname;
    if(!paths.includes(actualRoute)){
      actualRoute="mypets";
    }else{
      actualRoute= this.getRouteKeyByPath(actualRoute);
    }
    this.render(actualRoute);
  }

  navigateTo(routeKey) {
    const route = this.routes[routeKey];
    if (!route) {
      throw new Error(`Ruta "${routeKey}" no encontrada`);
    }
    window.pathname = route.route;
    document.title = route.name;
    this.setIcon(route.icon);
    window.history.pushState({}, '', route.route);
    this.render(routeKey);
  }

  async render(routeKey) {
    const route = this.routes[routeKey];
    if (!route) {
      this.appContainer.innerHTML = `<h2>Error 404: Ruta "${routeKey}" no encontrada</h2>`;
      return;
    }
    let templateHtml = '';
    try {
      if (typeof route.template === 'function') {
        templateHtml = await Promise.resolve(route.template());
      } else {
        templateHtml = await Promise.resolve(route.template);
      }
    } catch (err) {
      console.error('Error al renderizar plantilla:', err);
      templateHtml = `<h2>Error al renderizar ruta: ${err.message}</h2>`;
    }

    if (route.hasNavbar) {
      this.appContainer.innerHTML = `
        ${this.navbar.getTemplate()}
        <main id="page-content">${templateHtml}</main>
      `;
      this.navbar.render();
    } else {
      this.appContainer.innerHTML = templateHtml;
    }
    this.setIcon(route.icon);
    window.dispatchEvent(new CustomEvent('route-changed', { detail: routeKey }));
  }
  setIcon(icon) {
    const link = document.querySelector('link[rel*="icon"]');
    if (!link) {
      const iconLink = document.createElement('link');
      iconLink.rel = 'icon';
      iconLink.type = 'image/png';
      iconLink.href = "./"+icon;
      console.log(iconLink);
      document.head.appendChild(iconLink);
    }
    else {
      link.href ="./"+ icon;
    }

  }

  getRouteKeyByPath(path) {
    const cleanPath = path.replace(/\/$/, ''); 
    return Object.keys(this.routes).find(key => this.routes[key].route === cleanPath);
  }
}

const router = new Router(routes, document.getElementById('app-container'));
export default router;