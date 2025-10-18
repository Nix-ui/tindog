export default class Component{
    constructor(){
        this.element = null;
        this.mounted = false;
    }

    /**
     * @returns {string | HTMLElement | DocumentFragment} 
     */
    render(){
        throw new Error('render() method must be implemented');
    }

    /**
     * @returns {HTMLElement}
     */
    createElement(){
        const temp = document.createElement('div');
        temp.innerHTML = this.render().trim();
        return temp.firstElementChild;
    }

    /**
     * 
     * @param {string | HTMLElement} parent 
     */
    mount(parent){
        const template = this.render();
        const temp = document.createElement('div');
        temp.innerHTML = template;
        this.element = temp.firstElementChild;
        parent.appendChild(this.element);
        this.mounted = true;
        this.onMount();
    }

    unmount(){
        if(this.element && this.element.parentNode){
            this.element.parentNode.removeChild(this.element);
            this.mounted = false;
        }
    }

    update(){
        if (!this.mounted || !this.element) return;
        const newElement = this.createElement();
        this.element.replaceWith(newElement);
        this.element = newElement;
        this.onUpdate();
    }

    /**
     * 
     * @param {string} text 
     * @returns {string}
     */
    escapeHtml(text){
        if(!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
   * Trunca texto
   * @param {string} text
   * @param {number} maxLength
   * @returns {string}
   */
    truncate(text, maxLength) {
        if (!text || text.length <= maxLength) return text || '';
        return text.substring(0, maxLength) + '...';
    }
    onMount() {}
    onUnmount() {}
    onUpdate() {}

}