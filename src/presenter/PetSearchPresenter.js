import PetModel from '../models/pet/petModel';
import CardGenerator from '../managers/CardGenerator';
import PetDetails from '../pages/myPetDetails';
import PetRepository from '../repository/PetRepository';
import PetSearchView from '../view/PetSearchView';


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
  /**
   * 
   * @param {PetSearchView} view 
   */
  constructor( view) {
    this.view = view;
    // this.view.setHandleFilter('address-select', this.handleAddressChange.bind(this));
    // this.view.setHandleFilter('breed-select', this.handleBreedChange.bind(this));
    this.view.setOnSearch(this.handleFilterSearch.bind(this));
  }

  init() {
    this.view.filterOptions();
    if (!document.__tindog_view_details_listener) {
      document.addEventListener('click', onViewMoreClick);
      document.__tindog_view_details_listener = true;
    }
    this.view.showPets(petRepository.getAllPets());
  }

  /**
   * 
   * @param {string} event Evento con la direccion
   */

  // handleAddressChange(event) {
  //   const address = event.target.value;
  //   const pets =address === '' ?petRepository.getAllPets() : petRepository.filterByAddress(address);
  //   console.log(pets);
  //   this.view.showPets(pets);
  // }

  /**
   * 
   * @param {string} event Evento con la raza 
   */
  // handleBreedChange(event) {
  //   const breed = event.target.value;
  //   const pets =breed === '' ?petRepository.getAllPets() : petRepository.filterByBreed(breed);
  //   this.view.showPets(pets);
  // } 

  /**
   * 
   * @param {[Object]} filter  Array con los filtros aplicados
   * @param {*} event  Evento
   */
  handleFilterSearch(filter,event){
    event.preventDefault();
    const pets =filter === '' ?petRepository.getAllPets() : petRepository.filterBy(filter);
    this.view.showPets(pets);
  }
}