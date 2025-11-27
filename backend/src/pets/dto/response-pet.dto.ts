import { PartialType } from "@nestjs/mapped-types";
import { CreatePetDto } from "./create-pet.dto";

export class ResponsePetDto extends PartialType(CreatePetDto) {
    id: number;
    isLiked: boolean;
    adoptionRequest: boolean;
    breed: string;
    owner: string
}