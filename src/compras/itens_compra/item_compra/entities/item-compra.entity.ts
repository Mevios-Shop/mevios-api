import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { Compra } from "src/compras/compra/entities/compra.entity";
import { VariacaoProduto } from "src/produtos/variacao-produto/entities/variacao-produto.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { StatusItemCompra } from "../../status_item_compra/entities/status-item-compra.entity";

@Entity()
export class ItemCompra {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @ManyToOne(type => VariacaoProduto, variacao_produto => variacao_produto.id, { nullable: false, eager: true })
    @IsNotEmpty()
    @IsNumber()
    variacao_produto: number

    @ManyToOne(type => Compra, compra => compra.id, { nullable: false, eager: true })
    @IsNotEmpty()
    @IsNumber()
    compra: number

    @ManyToOne(type => StatusItemCompra, status_item_compra => status_item_compra.id, { nullable: false, eager: true})
    @IsNumber()
    @IsNotEmpty()
    status_item_compra: number

    @IsNotEmpty()
    @Column({ type: "decimal", precision: 10, scale: 2 })
    valor: number

    @IsString()
    @Column({ type: "text", nullable: true })
    link_anuncio: string

    constructor(variacao_produtoId: number, compraId: number, valor: number, link_anuncio?: string, status_item_compraId?: number) {
        this.variacao_produto = variacao_produtoId
        this.compra = compraId
        this.status_item_compra = status_item_compraId
        this.valor = valor
        this.link_anuncio = link_anuncio
    }
}