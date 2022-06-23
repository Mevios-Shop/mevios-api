import { TipoDespesa } from './../../../tipo-despesa/entities/tipo-despesa.entity';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartaoCredito } from "../../cartao/entities/cartao-credito.entity";
import { FaturaCartaoCredito } from "../../fatura-cartao-credito/entities/fatura-cartao-credito.entity";

@Entity()
export class DespesaCartaoCredito {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => CartaoCredito, cartao_credito => cartao_credito.id, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    cartao_credito: number

    @IsNotEmpty()
    @Column({ type: "decimal", precision: 10, scale: 2 })
    valor: number

    @IsNotEmpty()
    @IsNumber()
    @Column()
    quantidade_parcelas: number

    @IsString()
    @MaxLength(45)
    @IsNotEmpty()
    @Column()
    descricao: string

    @ManyToOne(type => FaturaCartaoCredito, fatura_cartao_credito => fatura_cartao_credito.id, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    fatura_cartao_credito: number

    @ManyToOne(type => TipoDespesa, tipo_despesa => tipo_despesa.id, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    tipo_despesa: number

    @Column({ type: "datetime" })
    data: Date

    constructor(cartao_creditoId: number, valor: number, quantidade_parcelas: number, descricao: string, fatura_cartao_creditoId: number, tipo_despesaId: number, data: Date) {
        this.cartao_credito = cartao_creditoId
        this.valor = valor
        this.quantidade_parcelas = quantidade_parcelas
        this.descricao = descricao
        this.fatura_cartao_credito = fatura_cartao_creditoId
        this.tipo_despesa = tipo_despesaId
        this.data = data
    }
}