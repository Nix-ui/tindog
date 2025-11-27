import PetModel from '../models/pet/petModel.js';
import CardGenerator from '../managers/CardGenerator.js';
import PetRepository from '../repository/PetRepository.js';
import LocalRepository from '../repository/LocalRepository.js';
import PetDetails from './myPetDetails.js';
import { PetService } from '../service/pets.service.js';

const petService = new PetService();
const cardGenerator = new CardGenerator();
const petRepository = new PetRepository();
const localRepository = new LocalRepository();

export default async function myPetsTemplate() {
  // const pets =localRepository.existsInLocalStorage('pets')? localRepository.getPetsFromLocalStorage(): petRepository.getAllPets();
  let pets = [];
  try {
    const response = await petService.getAllPets();
    pets = response;
  } catch (err) {
    console.error('Error al obtener mascotas:', err);
    pets = [];
  }
  const container = document.createElement('div');
  container.id = 'pets-container';
  container.className = 'pets-container flex flex-wrap justify-center gap-4 p-4';    
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