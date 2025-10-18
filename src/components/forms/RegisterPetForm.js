import BaseFormComponent from "./BaseFormComponent";

export default class RegisterPetForm extends BaseFormComponent {
    constructor(data, options={}) {
        super(data,{
            className: 'petForm',
            id: 'register-pet-form',
            ...options
        });
    }

    render(){
        return `
            <form class="${this.options.className} id="${this.options.id}" >
                ${this.renderFields()}
                <button type="submit" class="btn btn-primary">Registrar Mascota</button>
            </form>
        `
    }

    renderFields(){
        return `
            ${this.renderField('id','number','Id de la mascota')}
            ${this.renderField('name','text','Nombre de la mascota')}
            ${this.renderField('address','text','Dirección de la mascota')}
            ${this.renderField('age','number','Edad de la mascota')}
            ${this.renderField('breed','text','Raza de la mascota')}
            ${this.renderField('size','text','Tamaño de la mascota')}
            ${this.renderField('description','text','Descripción de la mascota')}
            ${this.renderField('owner','text','Nombre del dueño o refugio')}
            ${this.renderField('image','text','link de la imagen')}
        `
    }
    clearFields(){
        document.getElementById('id').value = '';
        document.getElementById('name').value = '';
        document.getElementById('address').value = '';
        document.getElementById('age').value = '';
        document.getElementById('breed').value = '';
        document.getElementById('size').value = '';
        document.getElementById('description').value = '';
        document.getElementById('owner').value = '';
        document.getElementById('image').value = '';
    }
}