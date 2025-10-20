import PetCollectionInstance from '../model/PetCollectionInstance.js';

export class PetRegistrationPresenter {
  constructor(model = PetCollectionInstance, { onSuccess, onError }) {
    this.model = model;
    this.onSuccess = onSuccess;
    this.onError = onError;
  }

  async handleRegisterPet(formData) {
    if (!formData.name || formData.name.trim() === '') {
      this.onError('El nombre de la mascota es obligatorio.');
      return;
    }
    if (typeof formData.age !== 'number' || formData.age < 0) {
      this.onError('La edad debe ser positiva');
      return;
    }
    if (!formData.breed || formData.breed.trim() === '') {
      this.onError('La raza de la mascota es obligatoria');
      return;
    }

    const pet = this.model.addPet(formData);
    this.onSuccess(pet);
  }
}
export default PetRegistrationPresenter;