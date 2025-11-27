import { Pet } from "src/pets/entities/pet.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./enums/role.enum";



@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({
        type : 'enum',
        enum : Role,
        default : Role.USER
    })
    role : Role

    @ManyToMany(() => Pet, (pet) => pet.users)
    @JoinTable({
        name : 'pets_users',
        joinColumn : {
            name : 'user_id',
            referencedColumnName : 'id'
        },
        inverseJoinColumn : {
            name : 'pet_id',
            referencedColumnName : 'id'
        }
    })
    pets: Pet[]
}
