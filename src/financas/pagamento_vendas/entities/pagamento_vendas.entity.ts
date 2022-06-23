import { ReceitaBancaria } from './../../conta-bancaria/receita-bancaria/entities/receita-bancaria.entity';
import { Plataforma } from './../../../plataformas/entities/plataforma.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber } from 'class-validator';
@Entity()
export class PagamentoVendas {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => Plataforma, plataforma => plataforma.id, { nullable: true })
    @IsNotEmpty()
    @IsNumber()
    plataforma: number

    @ManyToOne(type => ReceitaBancaria, receita_bancaria => receita_bancaria.id, { nullable: true })
    @IsNotEmpty()
    @IsNumber()
    receita_bancaria: number

    @Column({ type: "datetime" })
    data: Date

    constructor(plataformaId: number, receita_bancariaId: number, data: Date) {
        this.plataforma = plataformaId
        this.receita_bancaria = receita_bancariaId
        this.data = data
    }   
}