class PetModel {
  constructor() {
    this.pets = [];
    this.ownerPets = {};
  }
  registerPet(petData) {
    this.pets.push(petData);
    if (!this.ownerPets[petData.ownerId]) {
      this.ownerPets[petData.ownerId] = [];
    }
    this.ownerPets[petData.ownerId].push(petData);
    return petData;
  }
  getPetsByOwner(ownerId) {
    return this.ownerPets[ownerId] || [];
  }
}
export default PetModel;