import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { ContaBancaria } from "src/financas/conta-bancaria/conta/entities/conta-bancaria.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CartaoCredito {

    @PrimaryGeneratedColumn()
    id: number

    @IsString()
    @MaxLength(45)
    @IsNotEmpty()
    @Column()
    descricao: string

    @IsNotEmpty()
    @Column({ type: "decimal", precision: 10, scale: 2 })
    limite: number

    @Column({ type: "datetime" })
    data_vencimento: Date

    @Column({ type: "datetime" })
    data_fechamento: Date

    @ManyToOne(type => ContaBancaria, conta_bancaria => conta_bancaria.id, { nullable: true })
    @IsNotEmpty()
    @IsNumber()
    conta_bancaria: number

    constructor(descricao: string, limite: number, data_vencimento: Date, data_fechamento: Date, contaBancariaId?: number) {
        this.descricao = descricao
        this.limite = limite
        this.data_vencimento = data_vencimento
        this.data_fechamento = data_fechamento
        this.conta_bancaria = contaBancariaId
    }
}