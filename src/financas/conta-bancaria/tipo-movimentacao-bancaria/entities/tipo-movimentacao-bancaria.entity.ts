import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ContaBancaria } from "../../conta/entities/conta-bancaria.entity";

@Entity()
export class TipoMovimentacaoBancaria {

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