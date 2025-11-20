import CardGenerator from '../managers/CardGenerator';
import FilterType from '../models/filter/FilterType';
import FilterRequest from '../models/filter/FilterRequest';

const cardGenerator = new CardGenerator();


export default class PetSearchView {
  /**
   * 
   * @param {[FilterType]} filterTypes 
   * @param {string} resultsContainer 
   */
  constructor(filterTypes, resultsContainer) {
    this.searchButton = document.getElementById('search-pet-button');
    this.filterTypes = filterTypes;
    this.resultsContainer = document.getElementById(resultsContainer);
    this.filterTypes.forEach(filterType => {
      this[filterType.id] = document.getElementById(filterType.id);
      this[filterType.id].name = filterType.name;
      this[filterType.id].addEventListener('change', filterType.callback);
    })
  }
  setOnSearch(callback) {
    this.searchButton.addEventListener('click', (e)=>{
      e.preventDefault();
      callback(this.onSearch(), e);
    });
  }
  filterOptions() {
    this.filterTypes.forEach(filterType => {
      this[filterType.id].innerHTML =`<option value="">${filterType.value}</option>`;
      filterType.values.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        this[filterType.id].appendChild(option);
    });
    })
  }

  setHandleFilter(type, callback) {
    this[type].addEventListener('change', callback);
  }
  
  onSearch(){
    let filter = [];
    this.filterTypes.forEach(filterType => {
    if(this[filterType.id].value !== '') {
      filter.push(new FilterRequest(filterType.type, filterType.name, this[filterType.id].value,(filterType.fuctionToApply)));
    }
    })
    return filter;
  }

  showPets(pets) {
    if (!pets || pets.length === 0) {
      this.resultsContainer.innerHTML = `
        <p class="no-results">No hay mascotas disponibles para el seleccionada.</p>
      `;
      return;
    }
      cardGenerator.renderMany('pet', pets, this.resultsContainer, { animate: true });
  }
}