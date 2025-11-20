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
            <form class="${this.options.className} flex flex-col items-center justify-center shadow-2xl register-form  gap-4" id="${this.options.id}" [data-action="register-pet"]>
                <div class="card-header">
                    <h3 class="card-title">Registrar Mascota</h3>
                </div>
                <div class="card-content w-full max-w-2xl bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
                    ${this.renderFields()}
                </div>
                <input type="submit" class="btn btn-primary" value="Registrar Mascota" id="register-pet-button">
            </form>
        `
    }

    onRegisterPetClick(e){
        e.preventDefault();
        const form = e.target.closest('[data-action="register-pet"]');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        alert(JSON.stringify(data));
    }

    renderFields(){
        return `    
            ${this.renderManyFields([
                {name:"id",type:"number",placeholder:"Id de la mascota"},
                {name:"name",type:"text",placeholder:"Nombre de la mascota"}
            ])}
            ${this.renderManyFields([
                {name:"address",type:"text",placeholder:"Dirección de la mascota"},
                {name:"age",type:"number",placeholder:"Edad de la mascota"}
            ])}
            ${this.renderManyFields([
                {name:"breed",type:"text",placeholder:"Raza de la mascota"},
                {name:"size",type:"text",placeholder:"Tamaño de la mascota"}
            ])}
            ${this.renderManyFields([
                {name:"description",type:"text",placeholder:"Descripción de la mascota"}
            ])}
            ${this.renderManyFields([
                {name:"owner",type:"text",placeholder:"Nombre del dueño o refugio"},
                {name:"image",type:"text",placeholder:"link de la imagen"}
            ])}
        `
    }
    renderManyFields(filds){
        return `
            <div class="flex justify-center items-center gap-4">
                ${filds.map(fild => `
                    <div class="form-group">
                        <label class="form-label" for="${fild.name}">${fild.placeholder}</label>
                        <input type="${fild.type}" name="${fild.name}" id="${fild.name}" class="form-control form-input" placeholder="${fild.placeholder}">
                    </div>
                `).join('')}
            </div>
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