import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ContaBancaria {

    @PrimaryGeneratedColumn()
    id: number

    @IsString()
    @MaxLength(45)
    @IsNotEmpty()
    @Column()
    descricao: string

    constructor(descricao: string) {
        this.descricao = descricao
    }
}