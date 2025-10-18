import Component from "../components/core/Component";
import PetModel from "../models/pet/petModel.js";

export default class PetDetails extends Component{

    /**
     * 
     * @param {PetModel} petData 
     */
    constructor(petData, options = {}) {
        super();
        this.data = petData;
        this.options = {
            imageHeight: "20rem",
            maxDescriptionLength: 1000,
            ...options
        };
        this.isLiked = !!petData.isLiked;
        this._boundHandleClick = this.handleClick.bind(this);
        this._boundOnKey = this._onKeyDown.bind(this);
    }

    render(){
        const {
            id,
            name,
            address,
            age,
            breed,
            size,
            description,
            owner,
            image
        } = this.data;

        const desc = this.options.maxDescriptionLength
            ? this.truncate(description, this.options.maxDescriptionLength)
            : description;

        return `
        <div class="pet-detail-overlay" id="pet-detail-card-${id}" role="dialog" aria-modal="true">
            <div class="pet-detail-card p-4">
                <div class="pet-detail-image-container mb-4">
                    <img 
                        src="${this.escapeHtml(image)}" 
                        alt="${this.escapeHtml(name)}"
                        class="pet-detail-image"
                        loading="lazy"
                        onerror="this.src='https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800'"
                    />
                    <button 
                        class="pet-detail-like ${this.isLiked ? 'liked' : ''}"
                        data-action="like"
                        data-pet-id="${id}"
                        aria-label="${this.isLiked ? 'Quitar de favoritos' : 'Agregar a favoritos'}"
                    >
                        ❤️
                    </button>
                    <button 
                        class="pet-detail-close"
                        data-action="close"
                        aria-label="Cerrar"
                    >
                        ✕
                    </button>
                </div>

                <div class="space-y-3">
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-medium">${this.escapeHtml(name)}</h2>
                        <span class="badge badge-amber">
                            ${age} ${age === 1 ? 'año' : 'años'}
                        </span>
                    </div>

                    <p class="text-sm text-gray-600">
                        📍 ${this.escapeHtml(address)}
                    </p>

                    <div class="flex gap-2">
                        <span class="badge badge-primary">${this.escapeHtml(breed)}</span>
                        ${size ? `<span class="badge badge-outline">${this.escapeHtml(size)}</span>` : ''}
                    </div>

                    <p class="text-sm text-gray-600">
                        ${this.escapeHtml(desc)}
                    </p>

                    ${owner ? `
                        <div class="border-t border-gray-200 pt-3 mt-3">
                            <div class="flex items-center gap-2">
                                <span>🏠</span>
                                <div>
                                    <p class="font-medium">${this.escapeHtml(owner)}</p>
                                    <p class="text-sm text-gray-500">${this.escapeHtml(address)}</p>
                                </div>
                            </div>
                        </div>
                    ` : ''}

                    <div class="flex justify-center gap-2 mt-3">
                        <button class="btn btn-primary flex-1" data-action="contact">
                            Contáctame
                        </button>
                        <button class="btn btn-outline" data-action="share">
                            Compartir
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    onMount(){
        if (!this.element) return;
        this.element.addEventListener('click', this._boundHandleClick);
        document.addEventListener('keydown', this._boundOnKey);
    }

    onUnmount(){
        if (this.element) {
            this.element.removeEventListener('click', this._boundHandleClick);
        }
        document.removeEventListener('keydown', this._boundOnKey);
    }

    handleClick(e){
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const action = btn.dataset.action;
        if (action === 'close') return this.close();
        if (action === 'like') return this.toggleLike();
        if (action === 'contact') {
            const ev = new CustomEvent('pet-contact', { detail: { id: this.data.id, data: this.data }});
            document.dispatchEvent(ev);
            return;
        }
        if (action === 'share') {
            const ev = new CustomEvent('pet-share', { detail: { id: this.data.id, data: this.data }});
            document.dispatchEvent(ev);
            return;
        }
    }

    toggleLike(){
        this.isLiked = !this.isLiked;
        this.data.isLiked = this.isLiked;
        if (this.element){
            const heart = this.element.querySelector('[data-action="like"]');
            if (heart){
                heart.classList.toggle('liked', this.isLiked);
                heart.setAttribute('aria-label', this.isLiked ? 'Quitar de favoritos' : 'Agregar a favoritos');
            }
        }
        const ev = new CustomEvent('pet-like', { detail: { id: this.data.id, isLiked: this.isLiked, data: this.data }});
        document.dispatchEvent(ev);
        if (this.events && typeof this.events.emit === 'function') {
            this.events.emit('like', { id: this.data.id, isLiked: this.isLiked, data: this.data });
        }
    }

    close(){
        this.unmount();
    }

    _onKeyDown(e){
        if (e.key === 'Escape') this.close();
    }
}