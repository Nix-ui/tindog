import PetModel from '../models/pet/petModel';
import CardGenerator from '../managers/CardGenerator';
import PetDetails from '../pages/myPetDetails';
import PetRepository from '../repository/PetRepository';
import PetSearchView from '../view/PetSearchView';
import LocalRepository from '../repository/LocalRepository';


const petRepository = new PetRepository();
const localRepository = new LocalRepository();

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
    this.view.setOnSearch(this.handleFilterSearch.bind(this));
  }

  init() {
    this.view.filterOptions();
    if (!document.__tindog_view_details_listener) {
      document.addEventListener('click', onViewMoreClick);
      document.__tindog_view_details_listener = true;
    }
    if(!localRepository.existsInLocalStorage('pets')){
      localRepository.saveInLocalStorage('pets', petRepository.getAllPets());
    }
    this.view.showPets(localRepository.getPetsFromLocalStorage());
  }

  /**
   * 
   * @param {[Object]} filter
   * @param {*} event
   */
  handleFilterSearch(filter,event){
    event.preventDefault();
    const pets = filter === '' ? localRepository.getPetsFromLocalStorage() : localRepository.getPetsFilterBy(filter);
    this.view.showPets(pets);
  }
}