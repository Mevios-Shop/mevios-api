import { Plataforma } from './../../../plataformas/entities/plataforma.entity';
import { IsNumber } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { VariacaoProduto } from './../../variacao-produto/entities/variacao-produto.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SkuProduto {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => VariacaoProduto, variacao_produto => variacao_produto.id, { nullable: false, eager: true })
    @IsNotEmpty()
    @IsNumber()
    variacao_produto: number

    @IsNotEmpty()
    @Column({ type: "text", nullable: false })
    sku: string

    @ManyToOne(type => Plataforma, plataforma => plataforma.id, { nullable: false, eager: true })
    @IsNotEmpty()
    @IsNumber()
    plataforma: number

    constructor(variacao_produtoId: number, sku: string, plataformaId: number) {
        this.variacao_produto = variacao_produtoId
        this.sku = sku
        this.plataforma = plataformaId
    }
}