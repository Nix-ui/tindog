import PetModel from './PetModel.js';
const modelInstance = new PetModel();
export default function registerPet(petData) {
  return modelInstance.registerPet(petData);
}
export { modelInstance };