import { table } from 'console';
import { Breed } from 'src/breeds/entities/breed.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PetStatus } from './enums/pet-status.enum';


@Entity('pets')
export class Pet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    age: number;

    @Column({
        type : 'boolean',
        default : false
    })
    isLiked: boolean;

    @Column()
    size : string;

    @Column()
    description : string;

    @Column()
    image : string;

    @Column({
        type : 'enum',
        enum : PetStatus,
        default : PetStatus.AVAILABLE
    })
    status : PetStatus;

    @Column({
        type : 'boolean',
        default : false
    })
    adoptionRequest : boolean;

    @ManyToMany(() => User, (user) => user.pets)
    users : User[]

    @ManyToOne(() => Breed, (breed) => breed.pets)
    breed : Breed
}
