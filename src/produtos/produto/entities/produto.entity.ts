import { IsNumber } from "class-validator";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Produto {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column('boolean', {default: true})
    habilitado: boolean

    constructor(nome: string, habilitado: boolean) {
        this.nome = nome
        this.habilitado = habilitado
    }
}