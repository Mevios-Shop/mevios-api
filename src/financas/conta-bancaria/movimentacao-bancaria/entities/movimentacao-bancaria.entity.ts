import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ContaBancaria } from "../../conta/entities/conta-bancaria.entity";
import { TipoMovimentacaoBancaria } from "../../tipo-movimentacao-bancaria/entities/tipo-movimentacao-bancaria.entity";

@Entity()
export class MovimentacaoBancaria {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => ContaBancaria, conta_bancaria => conta_bancaria.id, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    conta_bancaria: number

    @IsNotEmpty()
    @Column({ type: "decimal", precision: 10, scale: 2 })
    valor: number

    @IsNotEmpty()
    @Column({ type: "decimal", precision: 10, scale: 2 })
    saldo: number

    @ManyToOne(type => TipoMovimentacaoBancaria, tipo_movimentacao_bancaria => tipo_movimentacao_bancaria.id, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    tipo_movimentacao_bancaria: number

    @Column({ type: "datetime" })
    data: Date

    constructor(contaBancariaId: number, valor: number, saldo: number, tipoMovimentacaoBancariaId: number, data: Date) {
        this.conta_bancaria = contaBancariaId
        this.valor = valor
        this.saldo = saldo
        this.tipo_movimentacao_bancaria = tipoMovimentacaoBancariaId
        this.data = data
    }
}