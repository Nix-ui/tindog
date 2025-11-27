import { Pet } from "src/pets/entities/pet.entity";
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('breeds')
export class Breed {
    @PrimaryGeneratedColumn()
    id: number
    @Column({unique: true})
    name: string
    @OneToMany(() => Pet, (pet) => pet.breed)
    pets: Pet[]
}
