import BaseFormComponent from "./BaseFormComponent";

export default class RegisterUserForm extends BaseFormComponent {
    constructor(data, options={}) {
        super(data,{
            className: 'registerUserForm',
            id: 'register-user-form',
            ...options
        });
    }

    render(){
        return `
            <form class="${this.options.className} flex flex-col items-center justify-center shadow-2xl register-form  gap-4" id="${this.options.id}" [data-action="register-user"]>
                <div class="card-header">
                    <h3 class="card-title">Registrar Usuario</h3>
                </div>
                <div class="card-content w-full max-w-2xl bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
                    ${this.renderFields()}
                </div>
                <input type="submit" class="btn btn-primary" value="Registrarse" id="register-user-button">
            </form>
        `
    }

    onRegisterUserClick(e){
        e.preventDefault();
        const form = e.target.closest('[data-action="register-user"]');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        alert(JSON.stringify(data));
    }

    renderFields(){
        return `    
            ${this.renderManyFields([
                {name:"name",type:"text",placeholder:"Nombre Completo"}
            ])}
            ${this.renderManyFields([
                {name:"email",type:"email",placeholder:"Dirección de correo: email@dominio.com"},
            ])}
            ${this.renderManyFields([
                {name:"password",type:"password",placeholder:"Contraseña"}
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
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
    }
}