import PetModel from './PetModel.js';

const modelInstance = new PetModel();

export default {
  registerPet: (petData) => modelInstance.registerPet(petData),
  getPetsByOwner: (ownerId) => modelInstance.getPetsByOwner(ownerId),
  getAllPets: () => modelInstance.pets
};
export { modelInstance };
