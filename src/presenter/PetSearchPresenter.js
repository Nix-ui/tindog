import PetModel from '../models/pet/petModel';
import CardGenerator from '../managers/CardGenerator';
import PetDetails from '../pages/myPetDetails';
import PetRepository from '../repository/PetRepository';

const petRepository = new PetRepository();

const onViewMoreClick = (e) => {
  e.preventDefault();
  const pets = petRepository.getAllPets();
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
export default class PetSearchPresenter {
  constructor( view) {
    this.view = view;
    this.handleBreedChange = this.handleBreedChange.bind(this);
  }

  init() {
    const breeds = petRepository.getBreeds();
    this.view.clearBreedOptions();
    this.view.populateBreedOptions(breeds);
    this.view.removeBreedChangeListener(); 
    this.view.onBreedChange(this.handleBreedChange);
    this.handleBreedChange(''); 
    if (!document.__tindog_view_details_listener) {
      document.addEventListener('click', onViewMoreClick);
      document.__tindog_view_details_listener = true;
    }
  }
  /**
   * 
   * @param {string} breed 
   */
  handleBreedChange(breed) {
    const pets =breed === '' ?petRepository.getAllPets() : petRepository.filterByBreed(breed);
    this.view.showPets(pets);
  } 
}