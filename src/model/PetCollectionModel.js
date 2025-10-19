import PetModel from './PetModel.js';

export default class PetCollectionModel {
  constructor() {
    this.pets = JSON.parse(localStorage.getItem('pets')) || [];
  }

  /**
   * Guarda en localStorage
   */
  _save() {
    localStorage.setItem('pets', JSON.stringify(this.pets));
  }

  /**
   * Agrega una mascota nueva
   * @param {object|PetModel} petData
   * @returns {PetModel}
   */
  addPet(petData) {
    let newPet;
    if (petData instanceof PetModel) {
      newPet = petData;
    } else {
      newPet = new PetModel(
        this.pets.length + 1,
        petData.name,
        petData.address || '',
        false,
        petData.age,
        petData.breed,
        petData.size || '',
        petData.description || '',
        petData.owner || '',
        petData.image || ''
      );
    }

    this.pets.push(newPet);
    this._save();
    return newPet;
  }

  getAllPets() {
    return [...this.pets];
  }

  getAllBreeds() {
    return [...new Set(this.pets.map(p => p.breed))];
  }

  filterByBreed(breed) {
    if (!breed) return this.getAllPets();
    return this.pets.filter(p => p.breed.toLowerCase() === breed.toLowerCase());
  }

  clearAll() {
    this.pets = [];
    this._save();
  }
}
