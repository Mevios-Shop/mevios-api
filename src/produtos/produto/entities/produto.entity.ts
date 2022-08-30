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

    @ManyToOne(type => Usuario, usuario => usuario.id, { nullable: false, eager: false })
    @IsNumber()
    usuario: number

    constructor(nome: string, habilitado: boolean, usuario: number) {
        this.nome = nome
        this.habilitado = habilitado
        this.usuario = usuario
    }
}