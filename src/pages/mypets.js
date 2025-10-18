import PetModel from '../models/pet/petModel.js';
import CardGenerator from '../managers/CardGenerator.js';
import petData from '../../data/pets.json';
import PetDetails from './myPetDetails.js';

const cardGenerator = new CardGenerator();

export default function myPetsTemplate() {
    if(localStorage.getItem('pets')) petData.push(...JSON.parse(localStorage.getItem('pets')));
    
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
    
    const cards = cardGenerator.renderMany('pet', pets, container, {
        animate: true,
        showLikeButton: true, 
        showDetailsButton: true,
        imageHeight: "12rem"
    });

    const onViewMoreClick = (e) => {
        const btn = e.target.closest('[data-action="view-details"]');
        if (!btn) return;
        
        const petId = btn.dataset.petId;
        const pet = pets.find(p => String(p.id) === String(petId));
        
        if (pet) {
            const detail = new PetDetails(pet);
            const mountPoint = document.querySelector('#modal-root') || document.body;
            detail.mount(mountPoint);
        }
    };
    if (!document.__tindog_view_details_listener) {
        document.addEventListener('click', onViewMoreClick);
        document.__tindog_view_details_listener = true;
    }

    return container.outerHTML;
}