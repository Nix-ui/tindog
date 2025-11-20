import PetModel from "../models/pet/petModel";
import LocalRepository from "./LocalRepository";

describe("LocalRepository", () =>{
    const localRepository = new LocalRepository();
    it('Deberia guardar una clave valor en local storage', () => {
        localRepository.saveInLocalStorage('key', 'value');
        const value = localStorage.getItem('key');
        expect(localRepository.existsInLocalStorage('key')).toBe(true);
        expect(value).not.toBe(null);
    });
    it('Deberia obtener un valor ya guardado en el local storage', () => {
        const data = 'value';
        localRepository.saveInLocalStorage('key', data);
        const value = localRepository.getFromLocalStorage('key');
        expect(value).toBe(data);
    });
    it('Deberia obtener las mascotas almacenadas',()=>{
        const petValues = [
            {
                id:1,
                name:"Juan",
                address:"Calle 1",
                isLiked:false,
                age:2,
                breed:"chihuahua",
                size: "pequenio",
                description:"Perro muy territorial pero alegre",
                owner:"Pedro",
                image:"image"
            }
        ]
        localRepository.saveInLocalStorage('pets',petValues);
        const pets = localRepository.getPetsFromLocalStorage();
        expect(pets).toBeInstanceOf(Array);
        pets.forEach(pet => {
            expect(pet).toBeInstanceOf(PetModel);
        });
    })
});