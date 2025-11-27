import config from "../config/config";
import PetModel from "../models/pet/petModel";

export class PetService {
    constructor() {
        if(PetService.instance) {
            return PetService.instance;
        }
        PetService.instance = this;
    }
    async getAllPets() {
        const response = await fetch(`${config().API_URL}/pets`, {
            method: 'GET',
            headers: { 
                'Accept': 'application/json'
            }
        });

        const contentType = response.headers.get('content-type') || '';
        if (!response.ok) {
            const body = await response.text();
            throw new Error(`HTTP ${response.status} - ${body}`);
        }
        if (!contentType.includes('application/json')) {
            const body = await response.text();
            throw new Error(`Respuesta no JSON: ${body}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) return [];
        return data.map((pet) => new PetModel(
            pet.id,
            pet.name,
            pet.address,
            pet.isLiked,
            pet.age,
            pet.breed,
            pet.size,
            pet.description,
            pet.owner,
            pet.image,
            pet.status,
            pet.adoptionRequest
        ));
    }
}