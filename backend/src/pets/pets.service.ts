import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { FindOperator, Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponsePetDto } from './dto/response-pet.dto';
import { PetMapper } from './mapper/pet.mapper';
import PetSearchByDto from './dto/pet-search-by.dto';
import { PetSearchHandler } from './handler/pet-search.handler';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private petsRepository: Repository<Pet>
  ){}

  create(createPetDto: CreatePetDto):Promise<ResponsePetDto>{
    let pet = PetMapper.toEntity(createPetDto);
    return this.petsRepository.save(pet)
    .then(pet => PetMapper.toResponse(pet))
    .catch(() => Promise.reject("Pet not created"));
  }

  findAll():Promise<ResponsePetDto[]> {
    return this.petsRepository.find({
      relations: ['breed', 'users']
    })
    .then(pets => pets.map(pet => PetMapper.toResponse(pet)));
  }

  findOne(id: number):Promise<ResponsePetDto | null> {
    return this.petsRepository.findOne({where: {id}})
    .then(pet =>PetMapper.toResponse(pet))
    .catch(() => Promise.reject("Pet not found"));
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
  searchPetsBy(searchRequest: PetSearchByDto):Promise<ResponsePetDto[]>{
    let filters = PetSearchHandler.handle(searchRequest);
    console.log(filters);
    if(filters.length === 0) return this.findAll();
    return this.petsRepository.find({
      where: filters,
      relations: ['breed', 'users']
    })
    .then(pets => pets.map(pet => PetMapper.toResponse(pet)));
  }
}
