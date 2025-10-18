import PetModel from '../models/pet/petModel.js';
import CardGenerator from '../managers/CardGenerator.js';
import petData from '../../data/pets.json';

const cardGenerator = new CardGenerator(); // Crear instancia correctamente

export default function myPetsTemplate() {
    const pets = petData.map(pet => new PetModel(
        pet.id, 
        pet.name, 
        pet.address, 
        pet.isLiked, 
        pet.age, 
        pet.breed, 
        pet.size, 
        pet.description, 
        pet.owner, 
        pet.image
    ));

    const container = document.createElement('div');
    
    container.id = 'pets-container';
    container.className = 'pets-container flex flex-wrap justify-center gap-4';
    
    cardGenerator.renderMany('pet', pets, container, {
        animate: true,
        showLikeButton: true, 
        showDetailsButton: true,
        imageHeight: "12rem"
    });
    return container.outerHTML;
}