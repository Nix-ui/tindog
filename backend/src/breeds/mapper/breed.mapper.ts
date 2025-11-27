import { CreateBreedDto } from "../dto/create-breed.dto";
import { ResponseBreedDto } from "../dto/response-breed.dto";
import { Breed } from "../entities/breed.entity";

export class BreedMapper{
    static toResponse(breed:Breed | null):ResponseBreedDto{
        try{
            if(breed === null) throw new Error('Breed cannot be null');
            let newBreed = new ResponseBreedDto();
            newBreed.id = breed.id;
            newBreed.name = breed.name;
            return newBreed
        }catch(e){
            throw new Error(e.message);
        }
    }
    static toEntity(breed:CreateBreedDto):Breed{
        let newBreed = new Breed();
        newBreed.name = breed.name;
        return newBreed;
    }
}