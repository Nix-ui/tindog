import PetCard from "../components/cards/PetCard";
import EventEmitter from "../components/core/EventEmitter";

export default class CardGenerator extends EventEmitter{
    constructor(){
        super();
        this.cardTypes= new Map([
            ['pet', PetCard]
        ]);
        this.globalOptions = {
            animate: true
        }
        this.globalCallbacks = new Map();
    }

    /**
     * 
     * @param {string} type 
     * @param {Object} data 
     * @param {Object} options 
     * @returns {BasicCard}
     */
    create(type, data, options={}){
        const CardClass = this.cardTypes.get(type);
        if(!CardClass){
            throw new Error('Card type not found');
        }
        const finalOptions = {...this.globalOptions, ...options};
        const card = new CardClass(data, finalOptions);
        this.attachGlobalCallbacks(card, type);
        this.emit('card:created', { type, card, data });
        return card;
    }

    /**
   * 
   * @param {string} type 
   * @param {Array} dataArray 
   * @param {Object} options
   * @returns {Array<BaseCard>}
   */
  createMany(type, dataArray, options = {}) {
    return dataArray.map(data => this.create(type, data, options));
  }

    /**
   *
   * @param {string} type
   * @param {Object} data
   * @param {string|HTMLElement} container
   * @param {Object} options
   * @returns {BaseCard}
   */
    render(type, data, container, options = {}) {
        const card = this.create(type, data, options);
        card.mount(container);
        return card;
    }

    /**
   * 
   * @param {string} type 
   * @param {Array} dataArray
   * @param {string|HTMLElement} container
   * @param {Object} options
   * @returns {Array<BaseCard>}
   */
    renderMany(type, dataArray, container, options = {}) {
        const target = typeof container === 'string' 
        ? document.querySelector(container)
        : container;

        if (!target) {
        throw new Error(`Container no encontrado: ${container}`);
        }

        target.innerHTML = '';

        const cards = dataArray.map((data, index) => {
        const card = this.create(type, data, {
            ...options,
            animationDelay: options.animate ? index * 100 : 0
        });

        if (options.animate && card.element) {
            setTimeout(() => {
            card.mount(target);
            this.animateCardEntry(card.element, index);
            }, index * 50);
        } else {
            card.mount(target);
        }

        return card;
        });
        this.emit('cards:rendered', { type, cards, container: target });

        return cards;
    }

    /**
   * 
   * @param {HTMLElement} element 
   * @param {number} index
   */
    animateCardEntry(element, index) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';

        requestAnimationFrame(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        });
    }

    /**
   * 
   * @param {string} cardType
   * @param {string} action
   * @param {Function} callback
   */
    onCardAction(cardType, action, callback) {
        const key = `${cardType}:${action}`;
        
        if (!this.globalCallbacks.has(key)) {
        this.globalCallbacks.set(key, []);
        }

        this.globalCallbacks.get(key).push(callback);
    }

    /**
   * 
   * @param {BaseCard} card 
   * @param {string} type
   */
    attachGlobalCallbacks(card, type) {
        
        const typeCallbacks = this.globalCallbacks.get(`${type}:*`) || [];
        const allCallbacks = this.globalCallbacks.get('*:*') || [];

        
        card.on('action', ({ action, data }) => {
       
        const specificKey = `${type}:${action}`;
        const specificCallbacks = this.globalCallbacks.get(specificKey) || [];

        
        [...specificCallbacks, ...typeCallbacks, ...allCallbacks].forEach(cb => {
            try {
            cb(data, card);
            } catch (error) {
            console.error('Error en callback global:', error);
            }
        });

        
        this.emit('card:action', { type, action, data, card });
        });
    }

    /**
   * 
   * @param {Object} options 
   */
    setGlobalOptions(options) {
        this.globalOptions = { ...this.globalOptions, ...options };
    }

    /**
   * 
   * @param {string|HTMLElement} container
   * @param {Array<BaseCard>} cards
   */
    clearContainer(container, cards = []) {
        const target = typeof container === 'string' 
        ? document.querySelector(container)
        : container;

        if (target) {
        target.innerHTML = '';
        }

        cards.forEach(card => card.destroy());

        this.emit('container:cleared', { container: target });
    }
}