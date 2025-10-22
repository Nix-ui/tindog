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
    filterByAddress(address) {
        return this.pets.filter(pet => pet.address.includes(address));
    }
    getBreeds() {
        return this.breeds;
    }
    filterBy(filters){
        let filteredPets = this.pets;
        filters.forEach(filter=>{
            filteredPets = filteredPets.filter(pet => {
                if(filter.type === 'breed') return pet.breed === filter.value;
                if(filter.type === 'address') return pet.address.includes(filter.value);
            });
        })
        return filteredPets;
    }
}