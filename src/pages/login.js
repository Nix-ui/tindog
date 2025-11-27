import FormGenerator from "../managers/FormGenerator";
import PetRepository from "../repository/PetRepository";
import LocalRepository from "../repository/LocalRepository";
import UserService from "../service/user.service";
import { AuthService } from "../service/auth.service";

const localRepository = new LocalRepository();
const formGenerator = new FormGenerator();
const petRepository = new PetRepository();
const authService = new AuthService();


export default async function loginTemplate() {
    const container = document.createElement('div');

    container.id = 'login-user-container';
    container.className = 'login-user-container flex flex-col items-center justify-center h-screen bg-gray-100';

    formGenerator.render('login-user', {}, container, {});

    const onLoginUserClick = async(e) => {
        e.preventDefault();
        const {email, password} = e.target.elements;

        const data = {
            email: email.value, 
            password: password.value
        }
        try{
            await authService.login(data);
        }catch(e){
            console.log(e);
        }
        window.dispatchEvent(new Event('popstate'));
        
    };
    if(!document.__tindog_loginUserClick){
        document.addEventListener('submit', onLoginUserClick);
        document.__tindog_loginUserClick = true;
    }

    return container.outerHTML;
}