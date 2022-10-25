import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @IsString()
    @Column()
    nome: string

    @IsNotEmpty()
    @IsString()
    @Column()
    email: string

    @IsNotEmpty()
    @IsString()
    @Column()
    senha: string

    constructor(nome: string, email: string, senha: string) {
        this.nome = nome
        this.email = email
        this.senha = senha
    }
}