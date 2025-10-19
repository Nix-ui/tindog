import PetModel from './PetModel.js';

export default class PetCollectionModel {
  constructor() {
    this.pets = [];
  }

  addPet(pet) {
    if (pet instanceof PetModel) {
      this.pets.push(pet);
    } else {
      throw new Error('Debe ser una instancia de PetModel');
    }
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
}
