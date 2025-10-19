import PetRegistrationPresenter from '../src/presenter/PetRegistrationPresenter.js';
import PetCollectionModel from '../src/model/PetCollectionModel.js';

describe('PetRegistrationPresenter', () => {
  let presenter;
  let model;
  let onSuccess;
  let onError;

  beforeEach(() => {
    // Mock localStorage
    global.localStorage = {
      store: {},
      getItem(key) {
        return this.store[key] || null;
      },
      setItem(key, value) {
        this.store[key] = value.toString();
      },
      removeItem(key) {
        delete this.store[key];
      },
      clear() {
        this.store = {};
      }
    };

    localStorage.clear();
    model = new PetCollectionModel();
    onSuccess = jest.fn();
    onError = jest.fn();
    presenter = new PetRegistrationPresenter(model, { onSuccess, onError });
  });

  test('debe registrar mascota con datos válidos', async () => {
    const validPet = {
      name: "Firulais",
      age: 2,
      breed: "Labrador",
      owner: "user123"
    };
    await presenter.handleRegisterPet(validPet);
    expect(onSuccess).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Firulais", breed: "Labrador", age: 2, owner: "user123" })
    );
    expect(onError).not.toHaveBeenCalled();
  });

  test('debe mostrar error si nombre está vacío', async () => {
    const invalidPet = {
      name: "",
      age: 2,
      breed: "Labrador",
      owner: "user123"
    };
    await presenter.handleRegisterPet(invalidPet);
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith("El nombre de la mascota es obligatorio.");
  });

  test('debe mostrar error si la edad es negativa', async () => {
    const invalidPet = {
      name: "Rocky",
      age: -1,
      breed: "Boxer",
      owner: "user123"
    };
    await presenter.handleRegisterPet(invalidPet);
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith("La edad debe ser positiva");
  });

  test('debe mostrar error si la raza está vacía', async () => {
    const invalidPet = {
      name: "Rocky",
      age: 2,
      breed: "",
      owner: "user123"
    };
    await presenter.handleRegisterPet(invalidPet);
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith("La raza de la mascota es obligatoria");
  });

  test('asocia la mascota al dueño correctamente en el modelo', async () => {
    // Add a helper method to PetCollectionModel if not already present
    model.getPetsByOwner = function (ownerId) {
      return this.getAllPets().filter(p => p.owner === ownerId);
    };

    const validPet = {
      name: "Max",
      age: 3,
      breed: "Beagle",
      owner: "user456"
    };
    await presenter.handleRegisterPet(validPet);
    const ownerPets = model.getPetsByOwner("user456");
    expect(ownerPets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Max", breed: "Beagle", age: 3, owner: "user456" })
      ])
    );
  });
});