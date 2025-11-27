import { PetStatus } from "../entities/enums/pet-status.enum";


export class CreatePetDto {
    name: string;
    address: string;
    age: number;
    size: string;
    description: string;
    image: string;
    status?: PetStatus;
    breedId: number;
    userId: number
}
