import { IsNotEmpty, IsNumber } from "class-validator";
import { MovimentacaoBancaria } from "src/financas/conta-bancaria/movimentacao-bancaria/entities/movimentacao-bancaria.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FaturaCartaoCredito } from "../../fatura-cartao-credito/entities/fatura-cartao-credito.entity";

@Entity()
export class PagamentoFaturaCartaoCredito {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => FaturaCartaoCredito, fatura_cartao_credito => fatura_cartao_credito.id, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    fatura_cartao_credito: number

    @ManyToOne(type => MovimentacaoBancaria, movimentacao_bancaria => movimentacao_bancaria.id, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    movimentacao_bancaria: number

    @Column({ type: "datetime" })
    data: Date

    constructor(fatura_cartao_creditoId: number, movimentacao_bancariaId: number, data: Date) {
        this.fatura_cartao_credito = fatura_cartao_creditoId
        this.movimentacao_bancaria = movimentacao_bancariaId
        this.data = data
    }
}