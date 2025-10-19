export default class PetSearchView {
  constructor() {
    this.breedSelect = document.getElementById('breed-select');
    this.resultsContainer = document.getElementById('results');
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
      this.breedSelect.appendChild(option);
    });
  }

  showPets(pets) {
    this.resultsContainer.innerHTML = '';

    if (!pets || pets.length === 0) {
      this.resultsContainer.innerHTML = `
        <p class="no-results">No hay mascotas disponibles para la raza seleccionada.</p>
      `;
      return;
    }

    pets.forEach(pet => {
      const div = document.createElement('div');
      div.className = 'pet-card';
      div.innerHTML = `
        <img src="${pet.image}" alt="${pet.name}" class="pet-img" style="max-width: 200px; height: auto; border-radius: 8px;"/>
        <h3>${pet.name}</h3>
        <p><strong>Raza:</strong> ${pet.breed}</p>
        <p><strong>Edad:</strong> ${pet.age}</p>
        <p>${pet.description}</p>
      `;
      this.resultsContainer.appendChild(div);
    });
  }
}