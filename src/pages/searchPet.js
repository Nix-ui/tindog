import PetSearchPresenter from '../presenter/PetSearchPresenter.js';
import PetSearchView from '../view/PetSearchView.js';
import PetRepository from '../repository/PetRepository.js';
import FilterType from '../models/filter/FilterType.js';

const petRepository = new PetRepository();

let breedFilter =  new FilterType('select', 'breed','breed-select',null,'Seleccione una raza');
breedFilter.setValues(petRepository.getBreeds());
let addressFilter =  new FilterType('select', 'address','address-select',null,'Seleccione una ciudad');
addressFilter.setValues([
  "Cochabamba","La Paz","Santa Cruz","Oruro","Potosi","Tarija","Beni","Pando"
]);
let filters = [breedFilter, addressFilter]

export default function searchPetTemplate() {
  setTimeout(() => {
    const view = new PetSearchView(filters, 'pets-container');
    const presenter = new PetSearchPresenter( view);
    presenter.init();
  }, 0);
  return `
    <section id="search-pet-container">
    <h1>Buscar mascota</h1>
    <div class="input-group form-group gap-4">
        <select id="breed-select" class="form-select"></select>
        <select id="address-select" class="form-select"></select>
        <button id="search-pet-button" class="btn btn-primary btn-search">Buscar</button>
    </div>
      <div id="pets-container" class="pets-container flex flex-wrap justify-center gap-4"></div>
    </section>
  `;
}