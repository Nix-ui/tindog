import FormGenerator from "../managers/FormGenerator.js";
import PetRepository from "../repository/PetRepository.js";
import LocalRepository from "../repository/LocalRepository.js";
import UnauthorizedCard from "../components/cards/UnauthorizedCard.js";
import { JwtService } from "../service/jwt.service.js";
import BreedService from "../service/breed.service.js";
import { PetService } from "../service/pets.service.js";

const localRepository = new LocalRepository();
const formGenerator = new FormGenerator();
const petRepository = new PetRepository();
const breedService = new BreedService();
const jwtService = new JwtService();
const petService = new PetService();

export default function registerPetTemplate() {
    const container = document.createElement('div');
    container.id = 'register-pet-container';
    container.className = 'register-pet-container flex flex-col items-center justify-center h-screen bg-gray-100';
    const authorized = localRepository.getFromLocalStorage('authorized');
    const token = localRepository.getFromLocalStorage('token');
    if (authorized && !token) {
        const unauth = new UnauthorizedCard({
            text: "Debes iniciar sesión para registrar una mascota",
            redirectDelay: 3000
        });
        const mountPoint = document.querySelector('#modal-root') || document.body;
        unauth.mount(mountPoint);
        return container.outerHTML;
    }
    formGenerator.render('register-pet', {}, container, {});

    const onRegisterPetClick = async (e) => {
        e.preventDefault();
        if(localRepository.getFromLocalStorage('authorized') === false){
            window.dispatchEvent(new Event('popstate'));
            window.location.href = '/login';
        }
        const {name, address, age, breed, size, description, image} = e.target.elements;
        const breedId = await breedService.getBreedByName(breed.value);
        const userId = jwtService.getIdFromToken(token);
        console.log(breedId);
        const data = {
            name: name.value, 
            address: address.value, 
            age: parseInt(age.value), 
            breedId: breedId.id, 
            size: size.value, 
            description: description.value, 
            image: image.value,
            isLiked: false,
            userId: userId,
        }
        console.log(data);
        const pet = await petService.registerPet(data);
        window.dispatchEvent(new Event('popstate'));
        window.location.href = '/mypets';
    };

    if (!document.__tindog_registerPetForm) {
        document.addEventListener('submit', onRegisterPetClick);
        document.__tindog_registerPetForm = true;
    }

    return container.outerHTML;
}