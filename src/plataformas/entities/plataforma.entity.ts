import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Plataforma {

    @PrimaryGeneratedColumn()
    id: number

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    @Column()
    descricao: string

    constructor(descricao: string) {
        this.descricao = descricao
    }
}