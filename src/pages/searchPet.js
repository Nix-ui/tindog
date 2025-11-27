import PetSearchPresenter from '../presenter/PetSearchPresenter.js';
import PetSearchView from '../view/PetSearchView.js';
import PetRepository from '../repository/PetRepository.js';
import FilterType from '../models/filter/FilterType.js';
import BreedService from '../service/breed.service.js';

const petRepository = new PetRepository();
const breedService = new BreedService();
let breedFilter =  new FilterType('select', 'breed',null,'Seleccione una raza',(pet,value)=>{
  return pet.breed === value;
});
const chargeBreed = async () => {
  try {
    let response = await breedService.getAllBreed();
    response = response.map((breed) => {
      return {
        "id": breed.name,
        "name": breed.name.toUpperCase()
      }
    })

    console.log(response);
    breedFilter.setValues(response);
  } catch (error) {
    console.log(error);
  }
}
let addressFilter =  new FilterType('select', 'address',null,'Seleccione una ciudad',(pet,value)=>{
  return pet.address.includes(value);
});
addressFilter.setValues([{
  "id": "Cochabamba",
  "name": "Cochabamba"
},
{
  "id": "La Paz",
  "name": "La Paz"
},
{
  "id": "Santa Cruz",
  "name": "Santa Cruz"
},
{
  "id": "Oruro",
  "name": "Oruro"
},
{
  "id": "Potosi",
  "name": "Potosi"
},
{
  "id": "Tarija",
  "name": "Tarija"
},
{
  "id": "Beni",
  "name": "Beni"
},
{
  "id": "Pando",
  "name": "Pando"
}]);
let sizeFilter = new FilterType('select', 'size', null, 'Selecciona un tamaño',(pet,value)=>{
  return pet.size === value;
}); 
sizeFilter.setValues([{
  "id": "Chico",
  "name": "Chico"
},
{
  "id": "Mediano",
  "name": "Mediano"
},
{
  "id": "Grande",
  "name": "Grande"
}
]); 
let filters = [breedFilter, addressFilter,sizeFilter]

export default async function searchPetTemplate() {
  await chargeBreed();
  setTimeout(() => {
    const view = new PetSearchView(filters, 'pets-container');
    const presenter = new PetSearchPresenter( view);
    presenter.init();
  }, 0);
  return `
    <section id="search-pet-container">
    <h1>Buscar mascota</h1>
    <div class= flex "input-group form-group gap-4">
        <select id="breed-select" class="form-select"></select>
        <select id="address-select" class="form-select"></select>
        <select id="size-select" class="form-select"></select>
        <button id="search-pet-button" class="btn btn-primary btn-search">Buscar</button>
    </div>
      <div id="pets-container" class="pets-container flex flex-wrap justify-center gap-4 p-2"></div>
    </section>
  `;
}