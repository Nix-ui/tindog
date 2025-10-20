import CardGenerator from '../managers/CardGenerator';

const cardGenerator = new CardGenerator();

export default class PetSearchView {
  constructor(breedFilter, resultsContainer) {
    this.breedSelect = document.getElementById(breedFilter);
    //this.breedSelect = document.getElementById('breed-select');
    this.resultsContainer = document.getElementById(resultsContainer);
    //this.resultsContainer = document.getElementById('pets-container');
    this.breedChangeHandler = null;

    this._boundChangeListener = this._onChange.bind(this);
    this.breedSelect.addEventListener('change', this._boundChangeListener);
  }

  _onChange() {
    if (this.breedChangeHandler) {
      this.breedChangeHandler(this.breedSelect.value);
    }
  }

  clearBreedOptions() {
    this.breedSelect.innerHTML = '';
  }

  removeBreedChangeListener() {
    this.breedChangeHandler = null;
  }

  onBreedChange(callback) {
    this.breedChangeHandler = callback;
  }

  populateBreedOptions(breeds) {
    this.breedSelect.innerHTML = '<option value="">-- Selecciona una raza --</option>';
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed;
      option.textContent = breed;
      option.setAttribute('data-breed', breed);
      this.breedSelect.appendChild(option);
    });
  }

  showPets(pets) {
    if (!pets || pets.length === 0) {
      this.resultsContainer.innerHTML = `
        <p class="no-results">No hay mascotas disponibles para la raza seleccionada.</p>
      `;
      return;
    }
      cardGenerator.renderMany('pet', pets, this.resultsContainer, { animate: true });
  }
}