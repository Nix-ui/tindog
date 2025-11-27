import { CreatePetDto } from "./create-pet.dto";


export class RegisterPetDto extends CreatePetDto {
    ownerId: number;
}