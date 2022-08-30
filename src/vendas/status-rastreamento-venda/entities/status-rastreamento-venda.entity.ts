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

    @ManyToOne(type => Usuario, usuario => usuario.id, { nullable: false, eager: false })
    @IsNumber()
    usuario: number

    constructor(descricao: string, usuario: number) {
        this.descricao = descricao
        this.usuario = usuario
    }
}