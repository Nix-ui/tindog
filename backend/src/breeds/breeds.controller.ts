import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { ResponseBreedDto } from './dto/response-breed.dto';
import { SearchByNameDto } from './dto/search-by-name.dto';

@Controller('breeds')
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @Post("")
  create(@Body() createBreedDto: CreateBreedDto):Promise<ResponseBreedDto>{
    return this.breedsService.create(createBreedDto);
  }

  @Get("")
  findAll() {
    return this.breedsService.findAll();
  }


  @Get("search")
  findByName(
    @Query('name') name?: string
  ) {
    let search = new SearchByNameDto();
    search.name = name?.toLowerCase();
    return this.breedsService.findByName(search);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBreedDto: UpdateBreedDto) {
    return this.breedsService.update(+id, updateBreedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.breedsService.remove(+id);
  }
}
