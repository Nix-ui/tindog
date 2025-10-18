import PetModel from "./petModel.js";
import CardGenerator from "../../managers/CardGenerator.js";
import PetCard from "../../components/cards/PetCard.js";

describe("Modelo de Mascotas", () => {
    it('Deberia Crear una Mascota', () => {
        const pet = new PetModel(1,'Nina', 'Barrio San Pedro, Santa Cruz',false, '1 año', 'Beagle', 'Pequeño', 'Curiosa y energética, perfecta para familias activas.', '🏠 Andrea Pérez',`https://images.unsplash.com/photo-1537151625747-768eb6cf92b6`);
        expect(pet).toBeInstanceOf(PetModel);
    });
    it("Deberia crear un card de la mascota",()=>{
        const pet = new PetModel(1,'Nina', 'Barrio San Pedro, Santa Cruz',false, '1 año', 'Beagle', 'Pequeño', 'Curiosa y energética, perfecta para familias activas.', '🏠 Andrea Pérez',`https://images.unsplash.com/photo-1537151625747-768eb6cf92b6`);
        const cardGenerator = new CardGenerator();
        const card = cardGenerator.create('pet', pet);
        expect(card).toBeInstanceOf(PetCard);
    })
    it("Deberia crear muchas tarjetas de mascotas", () => {
        const pets = [
            new PetModel(1,'Nina', 'Barrio San Pedro, Santa Cruz',false, '1 año', 'Beagle', 'Pequeño', 'Curiosa y energética, perfecta para familias activas.', '🏠 Andrea Pérez',`https://images.unsplash.com/photo-1537151625747-768eb6cf92b6`),
            new PetModel(1,'Nina', 'Barrio San Pedro, Santa Cruz',false, '1 año', 'Beagle', 'Pequeño', 'Curiosa y energética, perfecta para familias activas.', '🏠 Andrea Pérez',`https://images.unsplash.com/photo-1537151625747-768eb6cf92b6`),
            new PetModel(1,'Nina', 'Barrio San Pedro, Santa Cruz',false, '1 año', 'Beagle', 'Pequeño', 'Curiosa y energética, perfecta para familias activas.', '🏠 Andrea Pérez',`https://images.unsplash.com/photo-1537151625747-768eb6cf92b6`)
        ]
        const cardGenerator = new CardGenerator();
        const cards = cardGenerator.createMany('pet', pets);
        expect(Array.isArray(cards)).toBe(true);
        expect(cards.every(card => card instanceof PetCard)).toBe(true);
    })
    it('Deberia mostrar la informacion de la mascota', () => {
        const pet = new PetModel(1,'Nina', 'Barrio San Pedro, Santa Cruz',false, '1 año', 'Beagle', 'Pequeño', 'Curiosa y energética, perfecta para familias activas.', '🏠 Andrea Pérez',`https://images.unsplash.com/photo-1537151625747-768eb6cf92b6`);
        expect(pet.name).toBe('Nina');
        expect(pet.address).toBe('Barrio San Pedro, Santa Cruz');
        expect(pet.age).toBe('1 año');
        expect(pet.breed).toBe('Beagle');
        expect(pet.size).toBe('Pequeño');
        expect(pet.description).toBe('Curiosa y energética, perfecta para familias activas.');
        expect(pet.owner).toBe('🏠 Andrea Pérez');
        expect(pet.image).toBe('https://images.unsplash.com/photo-1537151625747-768eb6cf92b6');
        expect(pet.isLiked).toBe(false);
    });
})