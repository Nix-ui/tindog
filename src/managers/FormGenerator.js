import EventEmitter from "../components/core/EventEmitter";
import RegisterPetForm from "../components/forms/RegisterPetForm";
import RegisterUserForm from "../components/forms/RegisterUserForm";

export default class FormGenerator extends EventEmitter {
    constructor() {
        super();
        this.formTypes = new Map([
            ['register-pet', RegisterPetForm],
            ['register-user', RegisterUserForm]
        ]);
        this.globalOptions = {};
        this.globalCallbacks = new Map();
    }
    create(type, data, options = {}) {
        const FormClass = this.formTypes.get(type);
        if (!FormClass) {
            throw new Error('Form type not found');
        }
        const form = new FormClass(data, options);
        this.attachGlobalCallbacks(form, type);
        this.emit('form:created', { type, form, data });
        return form;
    }

    render(type, data, container, options = {}) {
        const form = this.create(type, data, options);
        form.mount(container);
        return form;
    }
    onFormAction(type, action, callback) {
        const key = `${type}:${action}`;
        if(!this.globalCallbacks.has(key)) this.globalCallbacks.set(key, []);
        this.globalCallbacks.get(key).push(callback);
    }

    attachGlobalCallbacks(form, type) {
        const typeCallbacks = this.globalCallbacks.get(`${type}:*`) || [];
        const allCallbacks = this.globalCallbacks.get('*:*') || [];
        form.on('action', ({ action, data }) => {
            const specificKey = `${type}:${action}`;
            const specificCallbacks = this.globalCallbacks.get(specificKey) || [];
            [...specificCallbacks, ...typeCallbacks, ...allCallbacks].forEach(cb => {
                try {
                    cb(data, form);
                } catch (error) {
                    console.error('Error en callback global:', error);
                }
            });
            this.emit('form:action', { type, action, data, form });
        });
    }
    clearContainer(container, forms = []) {
        const target = typeof container === 'string' ? document.querySelector(container) : container;
        if (target) {
            target.innerHTML = '';
        }
        forms.forEach(form => form.destroy());
        this.emit('container:cleared', { container: target });
    }
    
}