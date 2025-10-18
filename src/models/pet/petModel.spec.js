import PetModel from "./petModel.js";
import CardGenerator from "../../managers/CardGenerator.js";
import PetCard from "../../components/cards/PetCard.js";

describe("Modelo de Mascotas", () => {
    it('Deberia Crear una Mascota', () => {
        const pet = new PetModel('Nina', 'Barrio San Pedro, Santa Cruz', '1 año', 'Beagle', 'Pequeño', 'Curiosa y energética, perfecta para familias activas.', '🏠 Andrea Pérez');
        expect(pet).toBeInstanceOf(PetModel);
    });
})