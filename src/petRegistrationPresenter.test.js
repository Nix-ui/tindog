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
            expect.objectContaining({ name: "Firulais", breed: "Labrador", age: 2, ownerId: "user123"})
        );
        expect(onError).not.toHaveBeenCalled();
    });
    test('debe mostrar error si nombre está vacío', async () => {
        const invalidPet = {
            name: "",
            age: 2,
            breed: "Labrador",
            ownerId: "user123"
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
            ownerId: "user123"
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
            ownerId: "user123"
        };

        await presenter.handleRegisterPet(invalidPet);
        expect(onSuccess).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalledWith("La raza de la mascota es obligatoria");
    });
    test('asocia la mascota al dueño correctamente en el modelo', async () => {
        const validPet = {
            name: "Max",
            age: 3,
            breed: "Beagle",
            ownerId: "user456"
        };
        await presenter.handleRegisterPet(validPet);
        const ownerPets = model.getPetsByOwner("user456");
        expect(ownerPets).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: "Max", breed: "Beagle", age: 3, ownerId: "user456"})
            ])
        );
    });

});