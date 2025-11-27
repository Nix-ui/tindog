import { PartialType } from "@nestjs/mapped-types"
import { CreateBreedDto } from "./create-breed.dto"

export class ResponseBreedDto extends PartialType(CreateBreedDto){
    id: number
}