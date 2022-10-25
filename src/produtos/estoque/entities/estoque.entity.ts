import { IsNotEmpty, IsNumber } from "class-validator";
import { ItemCompra } from "src/compras/itens_compra/item_compra/entities/item-compra.entity";
import { VariacaoProduto } from "src/produtos/variacao-produto/entities/variacao-produto.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Estoque {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => VariacaoProduto, variacao_produto => variacao_produto.id, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    variacao_produto: number

    @ManyToOne(type => ItemCompra, item_compra => item_compra.id, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    item_compra: number

    @Column({ type: "datetime" })
    data: Date

    @ManyToOne(type => Usuario, usuario => usuario.id, { nullable: false, eager: false })
    @IsNumber()
    usuario: number

    constructor(variacao_produtoId: number, item_compraId: number, data: Date, usuarioId: number) {
        this.variacao_produto = variacao_produtoId
        this.item_compra = item_compraId
        this.data = data
        this.usuario = usuarioId
    }
}