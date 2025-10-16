class PetModel {
  constructor() {
    this.pets = [];
  }

  registerPet(petData) {
    this.pets.push(petData);
    return petData;
  }
}

module.exports = { PetModel };