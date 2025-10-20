// PetCollectionInstance.js
import PetCollectionModel from './PetCollectionModel.js';

const modelInstance = new PetCollectionModel();

export default {
  registerPet: (petData) => modelInstance.addPet(petData),
  getPetsByOwner: (ownerId) => modelInstance.getPetsByOwner(ownerId),
  getAllPets: () => modelInstance.getAllPets()
};

export { modelInstance };