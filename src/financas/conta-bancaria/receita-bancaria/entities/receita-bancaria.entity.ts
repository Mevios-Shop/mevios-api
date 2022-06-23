import { ContaBancaria } from '../../conta/entities/conta-bancaria.entity';
import { TipoReceitaBancaria } from '../../tipo-receita-bancaria/entities/tipo-receita-bancaria.entity';
import { IsNotEmpty, IsNumber } from "class-validator";
import { MovimentacaoBancaria } from "src/financas/conta-bancaria/movimentacao-bancaria/entities/movimentacao-bancaria.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReceitaBancaria {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => ContaBancaria,conta_bancaria => conta_bancaria.id, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    conta_bancaria: number

    @ManyToOne(type => MovimentacaoBancaria, movimentacao_bancaria => movimentacao_bancaria.id, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    movimentacao_bancaria: number

    @ManyToOne(type => TipoReceitaBancaria, tipo_receita_bancaria => tipo_receita_bancaria.id, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    tipo_receita_bancaria: number

    constructor(conta_bancariaId: number, movimentacao_bancariaId: number, tipo_receita_bancariaId: number) {
        this.conta_bancaria = conta_bancariaId
        this.movimentacao_bancaria = movimentacao_bancariaId
        this.tipo_receita_bancaria = tipo_receita_bancariaId
    }
}