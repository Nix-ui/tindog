import FormGenerator from "../managers/FormGenerator";

const formGenerator = new FormGenerator();

export default function registerPetTemplate() {
    const container = document.createElement('div');

    container.id = 'register-pet-container';
    container.className = 'register-pet-container flex flex-col items-center justify-center h-screen bg-gray-100';

    formGenerator.render('register-pet', {}, container, {});
    return container.outerHTML;
}