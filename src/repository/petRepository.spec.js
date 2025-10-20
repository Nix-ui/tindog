import petData from '../../data/pets.json';
import PetModel from '../models/pet/petModel';
import PetRepository from '../repository/PetRepository';

describe('Repositorio de mascotas', () => {
    let petRepository = new PetRepository();
    it('Deberia Devolver todas las mascotas guardadas', () => {
        let pets = petRepository.getAllPets();
        let expectedPets = petData.map(pet => new PetModel(pet.id, pet.name, pet.address, pet.isLiked, pet.age, pet.breed, pet.size, pet.description, pet.owner, pet.image));
        expect(pets).toEqual(expectedPets);
    });
});