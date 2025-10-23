import BasicCard from "./BasicCard.js";

export default class PetCard extends BasicCard {
    constructor(petData, options={}) {
        super(petData,{
            className: 'pet-card',
            showLikeButton: true,
            showDetailsButton: true,
            imageHeight: "12rem",
            ...options
        })
        this.isLiked = petData.isLiked || false;
    }

    /**
     * 
     * @returns {string}
     */
    render(){
        const {
            id,
            name,
            address,
            isLiked,
            age,
            breed,
            size,
            description,
            owner,
            image
        }=this.data;
        return `
            <div class="pet-card ${this.options.animate ? 'card-animated' : ''}" data-card-id="${id}" id="pet-card-${id}">
                ${this.renderImage(image, name)}
                ${this.renderHeader(name, address, age)}
                ${this.renderContent(breed, size, description, owner)}
            </div>
        `;
    }

    /**
     * 
     * @param {string} image 
     * @param {string} alt 
     * @returns {string}
     */
    renderImage(image, alt) {
        if (!this.options.showLikeButton) {
        return `
            <div class="pet-card-image-container">
            <img 
                src="${this.escapeHtml(image)}" 
                alt="${this.escapeHtml(alt)}" 
                class="pet-card-image"
                style="height: ${this.options.imageHeight};"
                loading="lazy"
                onerror="this.src='https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400'"
            >
            </div>
        `;
        }
        return `
        <div class="pet-card-image-container">
            <img 
            src="${this.escapeHtml(image)}" 
            alt="${this.escapeHtml(alt)}" 
            class="pet-card-image"
            style="height: ${this.options.imageHeight};"
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400'"
            >
            <button 
            class="pet-card-heart ${this.isLiked ? 'liked' : ''}"
            data-action="like"
            data-pet-id="${this.data.id}"
            aria-label="${this.isLiked ? 'Quitar de favoritos' : 'Agregar a favoritos'}"
            >
            ❤️
            </button>
        </div>
        `;
    }
    
    /**
     * 
     * @param {string} name 
     * @param {string} address 
     * @param {number} age 
     * @returns {string}
     */
    renderHeader(name,address,age){
        return `
        <div class="card-header">
            <div>
            <h3 class="card-title" id="pet-name-${this.data.id}">${this.escapeHtml(name)}</h3>
            <p class="card-description" id="pet-address-${this.data.id}">
                📍 ${this.escapeHtml(address)}
            </p>
            </div>
            <span class="badge badge-amber" id="pet-ages-${this.data.id}">
            ${age} ${age === 1 ? 'año' : 'años'}
            </span>
        </div>
        `;
    }
    /**
   * Renderiza el contenido principal
   * @param {string} breed - Raza
   * @param {string} size - Tamaño
   * @param {string} description - Descripción
   * @param {string} shelter - Refugio
   * @param {string} status - Estado de adopción
   * @returns {string} HTML
   */
    renderContent(breed, size, description, shelter, status="disponible") {
        const descriptionText = this.options.maxDescriptionLength 
        ? this.truncate(description, this.options.maxDescriptionLength)
        : description;

    const isAvailable = status === "disponible";
    const contactLabel = 
      status === "en proceso"
        ? "En proceso..."
        : status === "adoptado"
        ? "Adoptado"
        : "Contáctame";

        return `
        <div class="card-content">
            <p class="text-sm text-gray-600" id="pet-breed-size-${this.data.id}" >
            <span id="pet-breed-${this.data.id}">${this.escapeHtml(breed)}</span>
            <span>•</span>
            <span id="pet-size-${this.data.id}">${size ? this.escapeHtml(size) : ''}</span>
            </p>
            <p class="text-sm" style="margin-top: 0.5rem; margin-bottom: 0.5rem;" id="pet-description-${this.data.id}">
            ${this.escapeHtml(descriptionText)}
            </p>
            ${shelter ? `
            <p class="text-xs text-gray-500" id="pet-shelter-${this.data.id}">
                🏠 ${this.escapeHtml(shelter)}
            </p>
            ` : ''}
            ${this.options.showDetailsButton ? `
            <button 
                class="btn btn-primary" 
                style="margin-top: 1rem; width: 100%;"
                data-action="view-details"
                data-pet-id="${this.data.id}"
                id="view-pet-details-${this.data.id}"
            >
                Ver más
            </button>
            ` : ''}
 <button 
  id="contact-btn-${this.data.id}"
  class="btn ${isAvailable ? "btn-success" : "btn-disabled"}" 
  style="margin-top: 0.5rem; width: 100%;"
  data-action="contact"
  data-pet-id="${this.data.id}"
  ${!isAvailable ? "disabled" : ""}
>
  ${contactLabel}
</button>
        </div>
        `;
    }

    /**
     * 
     * @param {Event} e 
     * @returns 
     */
    handleClick(e) {
        const target = e.target.closest('[data-action]');
        if(!target) return;
        
        const action = target.dataset.action;
        const petId = target.dataset.petId;
        
        if(action === 'like') {
            this.toggleLike();
        }
        if(action === 'view-details') {
            this.onViewDetails(petId);
        }
        if (action === 'contact') {
        const button = target;
        this.onContact(petId, button);
}


        super.handleClick(e);
    }

    toggleLike(){
        this.isLiked = !this.isLiked;
        this.data.isLiked = this.isLiked;
        if(this.element){
            const heathBtn = this.element.querySelector('[data-action="like"]');
            if(heathBtn){
                heathBtn.classList.toggle('liked', this.isLiked);
                heathBtn.setAttribute('aria-label', this.isLiked ? 'Quitar de favoritos' : 'Agregar a favoritos');
            }
        }
        this.events.emit('like',{
            id: this.data.id,
            isLiked: this.isLiked,
            data: this.data
        });
        alert(this.isLiked ? 'Agregado a favoritos' : 'Quitado de favoritos');
    }

    onViewDetails(petId) {
        this.events.emit('view-details', petId);
    }

    /**
   * Maneja el clic del botón “Contáctame”
   * @param {number} petId 
   * @param {HTMLElement} button 
   */
  onContact(petId, button) {
    if (this.data.status !== "disponible") {
      alert(
        this.data.status === "en proceso"
          ? "⚠️ Esta mascota ya está en proceso de adopción."
          : "💛 Esta mascota ya fue adoptada."
      );
      return;
    }

    this.data.status = "en proceso";

  requestAnimationFrame(() => {
    const btn = document.querySelector(`#contact-btn-${this.data.id}`) 
             || document.querySelector(`[data-pet-id="${this.data.id}"][data-action="contact"]`);

    if (btn) {
      btn.textContent = "En proceso...";
      btn.disabled = true;
      btn.setAttribute("disabled", "true"); // <--- Hace visible el atributo
    }
  });

  // Emitir evento
    // Emitir evento interno (sistema de eventos de BasicCard)
  this.events.emit("contact", {
    id: petId,
    name: this.data.name,
    status: this.data.status,
  });


  document.dispatchEvent(
    new CustomEvent("pet-contact", {
      detail: {
        id: petId,
        name: this.data.name,
        status: this.data.status,
      },
    })
  );

  alert(`🐶 Has iniciado el proceso de adopción para ${this.data.name}.`);

}

    /**
     * 
     * @returns {boolean}
     */
    getLiked(){
        return this.isLiked;
    }

    setLiked(liked){
        if(liked !== this.isLiked) this.toggleLike();
    }
}