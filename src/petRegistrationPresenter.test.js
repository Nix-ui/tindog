const { PetRegistrationPresenter } = require('../src/presenter/PetRegistrationPresenter');
const { PetModel } = require('../src/model/PetModel');
describe('PetRegistrationPresenter', () => {
  let presenter;
  let model;
  let onSuccess;
  let onError;
  beforeEach(() => {
    model = new PetModel();
    onSuccess = jest.fn();
    onError = jest.fn();
    presenter = new PetRegistrationPresenter(model, { onSuccess, onError });
  });
   test('debe registrar mascota con datos válidos', async () => {
    const validPet = {
      name: "Firulais",
      age: 2,
      breed: "Labrador",
      ownerId: "user123"
    };

    await presenter.handleRegisterPet(validPet);

    expect(onSuccess).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Firulais", breed: "Labrador" })
    );
    expect(onError).not.toHaveBeenCalled();
  });

});