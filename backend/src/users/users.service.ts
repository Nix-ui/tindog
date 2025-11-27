import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ResponseUserDto } from './dto/response-user.dto';
import { UserMapper } from './mapper/user.mapper';
import { ResponsePetDto } from 'src/pets/dto/response-pet.dto';
import { PetMapper } from 'src/pets/mapper/pet.mapper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}
  create(createUserDto: CreateUserDto):Promise<ResponseUserDto>{
    try{
      if(createUserDto.password.length < 8){
        throw new Error('Password must be at least 8 characters long');
      }
      const user = UserMapper.toEntity(createUserDto)
      this.usersRepository.save(user);
      return Promise.resolve(UserMapper.toResponse(user));
    }catch(e){
      throw new Error(e.message);
    }
  }

  findAll():Promise<ResponseUserDto[]> {
    return this.usersRepository.find()
    .then(users => users.map(user => UserMapper.toResponse(user)));
  }

  findPetsByUserId(id: number):Promise<ResponsePetDto[]> {
    return this.usersRepository.findOne({
      where: {id},
      relations: ['pets', 'pets.breed', 'pets.users']
    })
    .then(user =>{
      if(user === null) throw new Error('User not found');
      return user.pets.map(pet => PetMapper.toResponse(pet))
    })
    .catch(() => Promise.reject("User not found"));
  }

  findByEmail(email: string):Promise<ResponseUserDto> {
    return this.usersRepository.findOneBy({email})
    .then(user => UserMapper.toResponse(user));
  }

  findUserbyEmail(email: string):Promise<User> {
    return this.usersRepository.findOneBy({email})
    .then(user => {
      if(user === null) throw new Error('User not found');
      return user
    })
    .catch(() => Promise.reject("User not found"));
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
