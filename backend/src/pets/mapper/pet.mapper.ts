import { UsersService } from "src/users/users.service";
import { ResponsePetDto } from "../dto/response-pet.dto";
import { Pet } from "../entities/pet.entity";
import { CreatePetDto } from "../dto/create-pet.dto";
import { Breed } from "src/breeds/entities/breed.entity";
import { User } from "src/users/entities/user.entity";
import { BadRequestException } from "@nestjs/common";
import { BreedsService } from "src/breeds/breeds.service";



export class PetMapper {

    
    
    static toResponse(pet:Pet | null): ResponsePetDto {
        try{
            if(pet === null) throw new Error('Pet cannot be null');
            let newPet = new ResponsePetDto();
            newPet.id = pet.id;
            newPet.isLiked = pet.isLiked;
            newPet.adoptionRequest = pet.adoptionRequest;
            newPet.breed = pet.breed.name;
            newPet.owner = pet.users[0].name;
            newPet.name = pet.name;
            newPet.address = pet.address;
            newPet.age = pet.age;
            newPet.size = pet.size;
            newPet.description = pet.description;
            newPet.image = pet.image;
            newPet.status = pet.status;
            return newPet
        }catch(e){
            throw new BadRequestException(e.message);
        }
    }
    static toEntity(pet:CreatePetDto):Pet{
        let newPet = new Pet();
        newPet.name = pet.name;
        newPet.address = pet.address;
        newPet.age = pet.age;
        newPet.size = pet.size;
        newPet.description = pet.description;
        newPet.image = pet.image;
        newPet.status = pet.status !== undefined ? pet.status : newPet.status;
        newPet.breed = new Breed();
        newPet.breed.id = pet.breedId;
        newPet.users = [new User()];
        newPet.users[0].id = pet.userId;
        return newPet;
    }
}