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
   * @returns {string} HTML
   */
    renderContent(breed, size, description, shelter) {
        const descriptionText = this.options.maxDescriptionLength 
        ? this.truncate(description, this.options.maxDescriptionLength)
        : description;

        const status = this.data.status || "available";
        const isInProcess = status === "in_process";

        const adoptionAction = isInProcess ? "cancel-adoption" : "start-adoption"; //////////////////////
        const adoptionText = isInProcess
            ? "Cancelar proceso de adopción"
            : "Iniciar Proceso de Adopción";

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

            <!-- BOTÓN DE ADOPCIÓN -->
            <button 
                class="btn btn-secondary"
                style="margin-top: 0.5rem; width: 100%;"
                data-action="${adoptionAction}"
                data-pet-id="${this.data.id}"
                id="start-adoption-${this.data.id}"
            >
                ${adoptionText}
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
        if(action === 'start-adoption' || action === 'cancel-adoption') {
            this.events.emit('action', { action, data: { id: petId }});
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