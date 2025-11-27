import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { filter } from 'rxjs';
import PetSearchByDto from './dto/pet-search-by.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  create(@Body() createPetDto: CreatePetDto) {
    return this.petsService.create(createPetDto);
  }

  @Get()
  findAll() {
    return this.petsService.findAll();
  }
  @Get('search')
  searchPetsBy(
    @Query('breed') breed?: string,
    @Query('size') size?: string,
    @Query('address') address?: string
  ){
    let filters = new PetSearchByDto();
    filters.breed = new Object();
    filters.breed.name = breed?.toLowerCase();
    filters.size = size;
    filters.address = address;
    return this.petsService.searchPetsBy(filters);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(+id, updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petsService.remove(+id);
  }
}
