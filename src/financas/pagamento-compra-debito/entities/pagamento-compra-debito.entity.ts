import { IsNotEmpty, IsNumber } from "class-validator";
import { Compra } from "src/compras/compra/entities/compra.entity";
import { MovimentacaoBancaria } from "src/financas/conta-bancaria/movimentacao-bancaria/entities/movimentacao-bancaria.entity";
import { MetodoPagamento } from "src/financas/metodo-pagamento/entities/metodo-pagamento.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PagamentoCompraDebito {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => MovimentacaoBancaria, movimentacao_bancaria => movimentacao_bancaria.id, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    movimentacao_bancaria: number

    @ManyToOne(type => Compra, compra => compra.id, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    compra: number

    @ManyToOne(type => MetodoPagamento, metodo_pagamento => metodo_pagamento.id, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    metodo_pagamento: number

    @Column({ type: "datetime" })
    data: Date

    constructor(movimentacao_bancariaId: number, compraId: number, metodo_pagamentoId: number, data: Date) {
        this.movimentacao_bancaria = movimentacao_bancariaId
        this.compra = compraId
        this.metodo_pagamento = metodo_pagamentoId
        this.data = data
    }
}