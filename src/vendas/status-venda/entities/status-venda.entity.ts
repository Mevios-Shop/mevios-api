import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StatusVenda {

    @PrimaryGeneratedColumn()
    id: number

    @IsString()
    @IsNotEmpty()
    @Column()
    descricao: string

    constructor(descricao: string) {
        this.descricao = descricao
    }
}