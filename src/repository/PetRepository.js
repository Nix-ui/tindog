import petData from '../../data/pets.json';
import PetModel from '../models/pet/petModel';
import FilterRequest from '../models/filter/FilterRequest';
import LocalRepository from './LocalRepository';

export default class PetRepository {
    constructor() {
        this.LocalRepository = new LocalRepository();
        this.pets = petData.map(pet => new PetModel(pet.id, pet.name, pet.address, pet.isLiked, pet.age, pet.breed, pet.size, pet.description, pet.owner, pet.image));
        this.breeds = [...new Set(petData.map(pet => pet.breed))];
    }
    getAllPets() {
        this.#checkIfPetsInLocalStorage();
        return this.pets;
    }
    #checkIfPetsInLocalStorage() {
        if(this.LocalRepository.existsInLocalStorage('pets')){
            this.pets = this.LocalRepository.getPetsFromLocalStorage();
        }
    }
    registerPet(pet) {
        this.#checkIfPetsInLocalStorage();
        this.pets.push(pet);
        this.LocalRepository.saveInLocalStorage('pets', this.pets);
    }
    filterByBreed(breed) {
        this.#checkIfPetsInLocalStorage();
        return this.pets.filter(pet => pet.breed === breed);
    }
    filterByAddress(address) {
        this.#checkIfPetsInLocalStorage();
        return this.pets.filter(pet => pet.address.includes(address));
    }
    getBreeds() {
        return this.breeds;
    }
    /**
     * 
     * @param {[FilterRequest]} filters 
     * @returns 
     */
    filterBy(filters){
        this.#checkIfPetsInLocalStorage();
        let filteredPets = this.pets;
        filters.forEach(filter=>{
            filteredPets = filteredPets.filter(pet => {
                return filter.callback(pet,filter.value);
            });
        })
        return filteredPets;
    }

}