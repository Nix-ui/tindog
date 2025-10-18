import Component from '../core/Component.js';
import EventEmitter from '../core/EventEmitter';

export default class BasicCard extends Component {
    constructor(data,options={}){
        super();
        this.data = data;
        this.options = {
            className:'',
            animate: true,
            ...options
        };
        this.eventEmitter = new EventEmitter();
    }

    /**
     * @returns {string}
     */
    render() {
        throw new Error('render() method must be implemented');
    }

    /**
     * 
     * @returns {string}
     */
    getBaseClasses() {
        return `card-${this.options.className}`.trim();
    }

    /**
     * 
     * @returns { HTMLElement }
     */
    createElement() {
        const element = super.createElement();
        this.attachEventListeners(element);
        return element;
    }


    attachEventListeners(element) {
        element.addEventListener('click', (e)=>{
            this.handleClick(e);
        });
    }

    /**
   * 
   * @param {Event} e
   */
    handleClick(e) {
        const target = e.target.closest('[data-action]');
        if (!target) return;
        const action = target.dataset.action;
        const eventData = this.getEventData(target);
        this.events.emit(action, eventData);
        this.events.emit('action', { action, data: eventData });
    }

    /**
   *
   * @param {HTMLElement} element
   * @returns {Object}
   */
    getEventData(element) {
        return {
        id: this.data.id,
        element,
        data: this.data,
        ...element.dataset
        };
    }
    /**
   * Registra un callback para una acción específica
   * @param {string} action - Nombre de la acción
   * @param {Function} callback - Función callback
   * @returns {Function} Función para desuscribirse
   */
    on(action, callback) {
        if (!this.events) this.events = new EventEmitter();
        return this.events.on(action, callback);
    }

    /**
     * 
     * @param {Object} newData
     */
    updateData(newData) {
        this.data = { ...this.data, ...newData };
        this.update();
    }

    /**
     * 
     * @returns {number|string}
     */
    getId() {
        return this.data.id;
    }

    /**
     * 
     */
    destroy() {
        this.events.removeAllListeners();
        this.unmount();
    }
}