import { IsNotEmpty, IsNumber } from "class-validator";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartaoCredito } from "../../cartao/entities/cartao-credito.entity";

@Entity()
export class FaturaCartaoCredito {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => CartaoCredito, cartao_credito => cartao_credito.id, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    cartao_credito: number

    constructor(cartaoCreditoId: number) {
        this.cartao_credito = cartaoCreditoId
    }
}