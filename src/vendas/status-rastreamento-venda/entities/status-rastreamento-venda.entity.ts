import { IsNotEmpty, IsNumber } from 'class-validator';
import { IsString } from 'class-validator';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StatusRastreamentoVenda {
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