export default class PetSearchView {
  constructor() {
    this.breedSelect = document.getElementById('breed-select');
    this.resultsContainer = document.getElementById('results');
    this.breedChangeHandler = null;

    this.breedSelect.addEventListener('change', () => {
      if (this.breedChangeHandler) {
        this.breedChangeHandler(this.breedSelect.value);
      }
    });
  }

  populateBreedOptions(breeds) {
    this.breedSelect.innerHTML = '<option value="">-- Todas las razas --</option>';
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
      this.resultsContainer.textContent = 'No hay mascotas disponibles para la raza seleccionada.';
      return;
    }

    pets.forEach(pet => {
      const div = document.createElement('div');
      div.className = 'pet-card';
      div.innerHTML = `
        <img src="${pet.image}" alt="${pet.name}" class="pet-img"/>
        <h3>${pet.name}</h3>
        <p><strong>Raza:</strong> ${pet.breed}</p>
        <p><strong>Edad:</strong> ${pet.age}</p>
        <p>${pet.description}</p>
      `;
      this.resultsContainer.appendChild(div);
    });
  }

  onBreedChange(callback) {
    this.breedChangeHandler = callback;
  }
}
