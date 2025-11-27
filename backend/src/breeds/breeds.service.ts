import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';
import { ResponseBreedDto } from './dto/response-breed.dto';
import { BreedMapper } from './mapper/breed.mapper';
import { SearchByNameDto } from './dto/search-by-name.dto';

@Injectable()
export class BreedsService {

  constructor(
    @InjectRepository(Breed)
    private breedsRepository: Repository<Breed>
  ) {}
  private exists(name: string): Promise<boolean> {
    return this.breedsRepository.findOne({where: {name: name.toLowerCase()}})
    .then(breed => !!breed)
    .catch(() => false);
  }

  create(createBreedDto: CreateBreedDto): Promise<ResponseBreedDto>{

      const breed = BreedMapper.toEntity(createBreedDto);
      return this.breedsRepository.save(breed)
      .then(() => Promise.resolve(BreedMapper.toResponse(breed)));
  }

  findAll(): Promise<ResponseBreedDto[]> {
    return this.breedsRepository.find()
    .then(breeds => breeds.map(breed => BreedMapper.toResponse(breed)));
  }

  
  findByName(search: SearchByNameDto): Promise<ResponseBreedDto>{
    console.log(search);
    if(search.name === undefined) throw new Error('Name is required');
    return this.breedsRepository.findOne({where: {name: search.name}})
    .then(breed => BreedMapper.toResponse(breed))
    .catch(() => Promise.reject("Something went wrong"));
  }

  update(id: number, updateBreedDto: UpdateBreedDto) {
    return `This action updates a #${id} breed`;
  }

  remove(id: number) {
    return `This action removes a #${id} breed`;
  }
}
