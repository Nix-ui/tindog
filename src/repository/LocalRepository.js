import PetModel from "../models/pet/petModel";
export default class LocalRepository {
    constructor() {

    }

    /**
     * 
     * @param {string} key 
     * @param {Object} data 
     */
    saveInLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    existsInLocalStorage(key) {
        return localStorage.getItem(key) !== null;
    }
    /**
     * 
     * @param {string} key 
     * @returns {Object}
     */
    getFromLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    getPetsFromLocalStorage() {
        return this.getFromLocalStorage('pets').map(pet => new PetModel(pet.id, pet.name, pet.address, pet.isLiked, pet.age, pet.breed, pet.size, pet.description, pet.owner, pet.image));
    }
}