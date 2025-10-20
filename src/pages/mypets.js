import PetModel from '../models/pet/petModel.js';
import CardGenerator from '../managers/CardGenerator.js';
import PetRepository from '../repository/PetRepository.js';
import PetDetails from './myPetDetails.js';

const cardGenerator = new CardGenerator();
const petRepository = new PetRepository();
export default function myPetsTemplate() {
  // ✅ Load pets from localStorage only
  const localPets = JSON.parse(localStorage.getItem('pets')) || petRepository.getAllPets();

  // ✅ Convert local pets to PetModel instances
  const pets = localPets.map(pet => new PetModel(
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

  // ✅ Create container
  const container = document.createElement('div');
  container.id = 'pets-container';
  container.className = 'pets-container flex flex-wrap justify-center gap-4';

  // ✅ Render cards
  cardGenerator.renderMany('pet', pets, container, {
    animate: true,
    showLikeButton: true,
    showDetailsButton: true,
    imageHeight: "12rem"
  });

  // ✅ Handle view details
  const onViewMoreClick = (e) => {
    const btn = e.target.closest('[data-action="view-details"]');
    if (!btn) return;

    const petId = btn.dataset.petId;
    const pet = pets.find(p => String(p.id) === String(petId));

    if (pet) {
      const detail = new PetDetails(pet);
      const mountPoint = document.querySelector('#modal-root') || document.body;

      const existingDetail = document.querySelector('.pet-detail-overlay');
      if (existingDetail) existingDetail.remove();

      detail.mount(mountPoint);
    }
  };

  // ✅ Attach listener only once
  if (!document.__tindog_view_details_listener) {
    document.addEventListener('click', onViewMoreClick);
    document.__tindog_view_details_listener = true;
  }

  return container.outerHTML;
}