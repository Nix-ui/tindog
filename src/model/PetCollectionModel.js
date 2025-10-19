import PetModel from '../models/pet/petModel.js';

export default class PetCollectionModel {
  constructor() {
    const rawPets = JSON.parse(localStorage.getItem('pets')) || [];
    this.pets = rawPets.map(p => new PetModel(
      p.id ?? 0,
      p.name ?? '',
      p.address ?? '',
      p.isLiked ?? false,
      p.age ?? 0,
      p.breed ?? '',
      p.size ?? '',
      p.description ?? '',
      p.owner ?? '',
      p.image ?? ''
    ));
  }

  /**
   * Guarda en localStorage
   */
  _save() {
    const raw = this.pets.map(p => ({
      id: p.id,
      name: p.name,
      address: p.address,
      isLiked: p.isLiked,
      age: p.age,
      breed: p.breed,
      size: p.size,
      description: p.description,
      owner: p.owner,
      image: p.image
    }));
    localStorage.setItem('pets', JSON.stringify(raw));
  }

  /**
   * Agrega una mascota nueva
   * @param {object|PetModel} petData
   * @returns {PetModel}
   */
  addPet(petData) {
    const nextId = this.pets.length > 0
      ? Math.max(...this.pets.map(p => p.id)) + 1
      : 1;

    let newPet;
    if (petData instanceof PetModel) {
      newPet = petData;
    } else {
      newPet = new PetModel(
        nextId,
        petData.name ?? '',
        petData.address ?? '',
        false,
        petData.age ?? 0,
        petData.breed ?? '',
        petData.size ?? '',
        petData.description ?? '',
        petData.owner ?? '',
        petData.image ?? ''
      );
    }

    this.pets.push(newPet);
    this._save();
    return newPet;
  }

  /**
   * Devuelve todas las mascotas
   * @returns {PetModel[]}
   */
  getAllPets() {
    return [...this.pets];
  }

  /**
   * Devuelve todas las razas únicas
   * @returns {string[]}
   */
  getAllBreeds() {
    return [...new Set(this.pets.map(p => p.breed ?? ''))].filter(b => b);
  }

  /**
   * Filtra mascotas por raza
   * @param {string} breed
   * @returns {PetModel[]}
   */
  filterByBreed(breed) {
    if (!breed) return this.getAllPets();
    return this.pets.filter(p => (p.breed ?? '').toLowerCase() === breed.toLowerCase());
  }

  /**
   * Filtra mascotas por dueño
   * @param {string} ownerId
   * @returns {PetModel[]}
   */
  getPetsByOwner(ownerId) {
    return this.pets.filter(p => p.owner === ownerId);
  }

  /**
   * Elimina todas las mascotas
   */
  clearAll() {
    this.pets = [];
    this._save();
  }
}