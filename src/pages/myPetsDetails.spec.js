import PetDetails from "./myPetDetails";
import PetModel from "../models/pet/petModel";


describe("Detalle de Mascota", () => {
    it('Deberia Mostrarse el detalle dada una mascota', () => {
        const pet = new PetModel(1,'Nina', 'Barrio San Pedro, Santa Cruz',false, '1 año', 'Beagle', 'Pequeño', 'Curiosa y energética, perfecta para familias activas.', '🏠 Andrea Pérez',`https://images.unsplash.com/photo-1537151625747-768eb6cf92b6`);
        const petDetails = new PetDetails(pet);
        expect(petDetails).toBeInstanceOf(PetDetails);        
    });
});