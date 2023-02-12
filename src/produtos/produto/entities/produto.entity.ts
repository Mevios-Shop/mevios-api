import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Produto {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column('boolean', { default: true })
    habilitado: boolean

    constructor(nome: string, habilitado: boolean) {
        this.nome = nome
        this.habilitado = habilitado
    }
}