import petData from '../../data/pets.json';
import FilterRequest from '../models/filter/FilterRequest';
import FilterType from '../models/filter/FilterType';
import PetModel from '../models/pet/petModel';
import PetRepository from '../repository/PetRepository';

describe('Repositorio de mascotas', () => {
    let petRepository = new PetRepository();
    it('Deberia Devolver todas las mascotas guardadas', () => {
        let pets = petRepository.getAllPets();
        let expectedPets = petData.map(pet => new PetModel(pet.id, pet.name, pet.address, pet.isLiked, pet.age, pet.breed, pet.size, pet.description, pet.owner, pet.image));
        expect(pets).toEqual(expectedPets);
    });
    it('Deberia registrar una mascota', () => {
        let pet = new PetModel(1,
                "Juan",
                "Calle 1",
                false,
                2,
                "chihuahua",
                "pequenio",
                "Perro muy territorial pero alegre",
                "Pedro",
                "image"
        )
        const previousPets = petRepository.getAllPets();
        const previousPetsLength = previousPets.length
        petRepository.registerPet(pet);
        const finalyPets = petRepository.getAllPets();
        expect(finalyPets).toBeInstanceOf(Array);
        expect(finalyPets.length>previousPetsLength).toBe(true);
        expect(finalyPets.pop()).toBe(pet);
    });
    it('Deberia filtrar mascotas por raza', () => {
        let filteredPets = petRepository.filterByBreed('Beagle');
        let expectedPets = petData.filter(pet => pet.breed === 'Beagle').map(pet => new PetModel(pet.id, pet.name, pet.address, pet.isLiked, pet.age, pet.breed, pet.size, pet.description, pet.owner, pet.image));
        expect(filteredPets).toEqual(expectedPets);
    });
    it('Deberia Filtrar por direccion',()=>{
        let pets = petRepository.filterByAddress('Cochabamba');
        let expectedPets = petData.filter(pet => pet.address.includes('Cochabamba')).map(pet => new PetModel(pet.id, pet.name, pet.address, pet.isLiked, pet.age, pet.breed, pet.size, pet.description, pet.owner, pet.image));
        expect(pets).toEqual(expectedPets);
    });
    it('Deberia obtener todas las razas que hay',()=>{
        let breeds = [...new Set(petData.map(pet=>pet.breed))]
        expect(petRepository.getBreeds()).toEqual(breeds);
    });
    it('Deberia filtrar por mas de una campo',()=>{
        let expectedPets = petData.filter(pet=>pet.breed === "Dálmata").filter(pet => pet.address.includes('Cochabamba')).map(pet => new PetModel(pet.id, pet.name, pet.address, pet.isLiked, pet.age, pet.breed, pet.size, pet.description, pet.owner, pet.image));
        let breedFilter =  new FilterType('select', 'breed',null,'Seleccione una raza',(pet,value)=>{
            return pet.breed === value;
        });
        breedFilter.setValues(petRepository.getBreeds());
        let addressFilter =  new FilterType('select', 'address',null,'Seleccione una ciudad',(pet,value)=>{
            return pet.address.includes(value);
        });
        addressFilter.setValues([
            "Cochabamba","La Paz","Santa Cruz","Oruro","Potosi","Tarija","Beni","Pando"
        ]);
        const filters = [breedFilter,addressFilter]
        let pets = [];
        let filterTo = [];
        filterTo.push(new FilterRequest(breedFilter.type,breedFilter.name,"Dálmata",(breedFilter.fuctionToApply)));
        filterTo.push(new FilterRequest(addressFilter.type,addressFilter.name,"Cochabamba",(addressFilter.fuctionToApply)));
        pets = petRepository.filterBy(filterTo);
        expect(pets).toEqual(expectedPets);
    });
});