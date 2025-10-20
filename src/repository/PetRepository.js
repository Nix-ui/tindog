import petData from '../../data/pets.json';
import PetModel from '../models/pet/petModel';

export default class PetRepository {
    constructor() {
        this.pets = petData.map(pet => new PetModel(pet.id, pet.name, pet.address, pet.isLiked, pet.age, pet.breed, pet.size, pet.description, pet.owner, pet.image));
        this.breeds = [...new Set(petData.map(pet => pet.breed))];
    }
    getAllPets() {
        return this.pets;
    }
    registerPet(pet) {
        this.pets.push(pet);
    }
    filterByBreed(breed) {
        return this.pets.filter(pet => pet.breed === breed);
    }
    getBreeds() {
        return this.breeds;
    }
}