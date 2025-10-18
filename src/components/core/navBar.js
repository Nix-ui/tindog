export default class NavBar {
  constructor(element, items) {
    this.element = element;
    this.items = items;
  }

  getTemplate() {
    const links = this.items.map(item => `
      <li>
        <a href="/${item.path}" 
           data-route="${item.path}" 
           class="nav-tab ${window.location.pathname === `/${item.path}` ? "active" : ""}">
          ${item.label}
        </a>
      </li>
    `).join('');

    return `
      <header class="tindog-header">
        <div class="tindog-header-content">
          <div class="tindog-header-left">
            <h1 class="tindog-title">Tindog</h1>
          </div>
          <nav class="tindog-nav">
            <ul class="tindog-nav-list flex gap-3">
              ${links}
            </ul>
          </nav>
        </div>
      </header>
    `;
  }

  render() {
    this.element.innerHTML = this.getTemplate();

    const links = this.element.querySelectorAll("[data-route]");
    links.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const route = link.dataset.route;
        history.pushState({}, "", `/${route}`);
        this.updateActive(route);
        window.dispatchEvent(new Event("popstate"));
      });
    });
  }

  updateActive(route) {
    const links = this.element.querySelectorAll("[data-route]");
    links.forEach(link => {
      link.classList.toggle("active", link.dataset.route === route);
    });
  }
}
