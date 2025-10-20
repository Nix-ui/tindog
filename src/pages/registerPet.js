import FormGenerator from "../managers/FormGenerator";
import PetRepository from "../repository/PetRepository";
import LocalRepository from "../repository/LocalRepository";

const localRepository = new LocalRepository();
const formGenerator = new FormGenerator();
const petRepository = new PetRepository();

export default function registerPetTemplate() {
    const container = document.createElement('div');

    container.id = 'register-pet-container';
    container.className = 'register-pet-container flex flex-col items-center justify-center h-screen bg-gray-100';

    formGenerator.render('register-pet', {}, container, {});

    const onRegisterPetClick = (e) => {
        e.preventDefault();
        const {id, name, address, age, breed, size, description, owner, image} = e.target.elements;

        const data = {
            id: parseInt(id.value), 
            name: name.value, 
            address: address.value, 
            age: parseInt(age.value), 
            breed: breed.value, 
            size: size.value, 
            description: description.value, 
            owner: owner.value, 
            image: image.value,
            isLiked: false 
        }
        petRepository.registerPet(data);
        localRepository.saveInLocalStorage('pets',petRepository.getAllPets());
        window.location.href = '/mypets';
    };
    if(!document.__tindog_registerPetForm){
        document.addEventListener('submit', onRegisterPetClick);
        document.__tindog_registerPetForm = true;
    }

    return container.outerHTML;
}