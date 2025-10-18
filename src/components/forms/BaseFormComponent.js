import EventEmitter from '../core/EventEmitter.js';
export default class BaseFormComponent{
    constructor(data, options={}){
        this.data = data;
        this.options = options;
        this.mounted = false;
    }

    renderFields(){
        throw new Error('Method not implemented');
    }

    renderField(name,type,placeholder){
        return `
            <div class="form-group">
                <label class="form-label" for="${name}">${name}</label>
                <input type="${type}" name="${name}" id="${name}" class="form-control form-input" placeholder="${placeholder}">
            </div>
        `
    }
    clearFields(){
        throw new Error('Method not implemented');
    }
    mount(parent){
        const template = this.render();
        const temp = document.createElement('div');
        temp.innerHTML = template;
        this.element = temp.firstElementChild;
        parent.appendChild(this.element);
        this.mounted = true;
    }
    on(action, callback) {
        if (!this.events) this.events = new EventEmitter();
        return this.events.on(action, callback);
    }
}