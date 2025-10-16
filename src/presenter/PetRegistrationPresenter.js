class PetRegistrationPresenter {
  constructor(model, { onSuccess, onError }) {
    this.model = model;
    this.onSuccess = onSuccess;
    this.onError = onError;
  }

  async handleRegisterPet(formData) {
    const pet = this.model.registerPet(formData);
    this.onSuccess(pet);
  }
}
module.exports = { PetRegistrationPresenter };