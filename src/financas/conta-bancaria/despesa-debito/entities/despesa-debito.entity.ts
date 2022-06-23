import { ContaBancaria } from './../../conta/entities/conta-bancaria.entity';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { MovimentacaoBancaria } from 'src/financas/conta-bancaria/movimentacao-bancaria/entities/movimentacao-bancaria.entity';
import { TipoDespesa } from 'src/financas/tipo-despesa/entities/tipo-despesa.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DespesaDebito {

    @PrimaryGeneratedColumn()
    id: number

    @IsString()
    @MaxLength(45)
    @IsNotEmpty()
    @Column()
    descricao: string

    @ManyToOne(type => TipoDespesa, tipo_despesa => tipo_despesa.id, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    tipo_despesa: number

    @Column({ type: "datetime" })
    data: Date

    @ManyToOne(type => ContaBancaria, conta_bancaria => conta_bancaria.id, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    conta_bancaria: number

    @ManyToOne(type => MovimentacaoBancaria, movimentacao_bancaria => movimentacao_bancaria.id, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    movimentacao_bancaria: number

    @IsNotEmpty()
    @Column({ type: "decimal", precision: 10, scale: 2 })
    valor: number

    constructor(descricao: string, data: Date, valor: number, conta_bancariaId: number, movimentacao_bancariaId, tipo_despesaId: number) {
        this.descricao = descricao
        this.tipo_despesa = tipo_despesaId
        this.data = data
        this.conta_bancaria = conta_bancariaId
        this.movimentacao_bancaria = movimentacao_bancariaId
        this.valor = valor
    }
}