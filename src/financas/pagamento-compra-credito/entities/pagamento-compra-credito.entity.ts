import { Column } from 'typeorm';
import { DespesaCartaoCredito } from './../../cartao-credito/despesa-cartao-credito/entities/despesa-cartao-credito.entity';
import { Compra } from './../../../compras/compra/entities/compra.entity';
import { IsNumber } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';
@Entity()
export class PagamentocompraCredito {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => Compra, compra => compra.id, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    compra: number

    @ManyToOne(type => DespesaCartaoCredito, despesa_cartao_credito => despesa_cartao_credito.id, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    despesa_cartao_credito: number
    
    @Column({ type: "datetime" })
    data: Date

    constructor(compraId: number, despesa_cartao_creditoId: number, data: Date) {
        this.compra = compraId
        this.despesa_cartao_credito = despesa_cartao_creditoId
        this.data = data
    }
}