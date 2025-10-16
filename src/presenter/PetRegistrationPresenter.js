class PetRegistrationPresenter {
  constructor(model, { onSuccess, onError }) {
    this.model = model;
    this.onSuccess = onSuccess;
    this.onError = onError;
  }
  async handleRegisterPet(formData) {
    if (!formData.name || formData.name.trim() === "") {
      this.onError("El nombre de la mascota es obligatorio.");
      return;
    }
    if (typeof formData.age !== "number" || formData.age < 0) {
      this.onError("La edad debe ser positiva");
      return;
    }
    const pet = this.model.registerPet(formData);
    this.onSuccess(pet);
  }
}
module.exports = { PetRegistrationPresenter };