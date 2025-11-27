import FormGenerator from "../managers/FormGenerator";
import PetRepository from "../repository/PetRepository";
import LocalRepository from "../repository/LocalRepository";
import UserService from "../service/user.service";
import { JwtService } from "../service/jwt.service";


const localRepository = new LocalRepository();
const formGenerator = new FormGenerator();
const petRepository = new PetRepository();
const userService = new UserService();


export default function registerUserTemplate() {
    const container = document.createElement('div');

    container.id = 'register-user-container';
    container.className = 'register-user-container flex flex-col items-center justify-center h-screen bg-gray-100';

    formGenerator.render('register-user', {}, container, {});

    const onRegisterUserClick = async(e) => {
        e.preventDefault();
        const {name, email, password} = e.target.elements;

        const data = {
            name: name.value, 
            email: email.value, 
            password: password.value
        }
        const user = await userService.registerUser(data);
        window.dispatchEvent(new Event('popstate'));
        window.location.href = '/';
    };
    if(!document.__tindog_registerUserForm){
        document.addEventListener('submit', onRegisterUserClick);
        document.__tindog_registerUserForm = true;
    }

    return container.outerHTML;
}