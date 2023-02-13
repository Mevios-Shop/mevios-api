import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Compra } from "src/compras/compra/entities/compra.entity";
import { VariacaoProduto } from "src/produtos/variacao-produto/entities/variacao-produto.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne(type => StatusItemCompra, statusItemCompra => statusItemCompra.id, { nullable: false, eager: true })
    @IsNumber()
    @IsNotEmpty()
    status_item_compra: number

    @IsNotEmpty()
    @Column({ type: "decimal", precision: 10, scale: 2 })
    valor: number

    @IsString()
    @Column({ type: "text", nullable: true })
    link_anuncio: string

    @IsNumber()
    @ManyToOne(type => Usuario, usuario => usuario.id, { nullable: false, eager: false })
    usuario: number
}