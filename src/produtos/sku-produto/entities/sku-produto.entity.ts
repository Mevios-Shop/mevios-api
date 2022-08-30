import { Plataforma } from './../../../plataformas/entities/plataforma.entity';
import { IsNumber } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { VariacaoProduto } from './../../variacao-produto/entities/variacao-produto.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from 'src/usuarios/entities/usuario.entity';

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

    @ManyToOne(type => Plataforma, plataforma => plataforma.id, { nullable: false, eager: true})
    @IsNotEmpty()
    @IsNumber()
    plataforma: number

    @ManyToOne(type => Usuario, usuario => usuario.id, { nullable: false, eager: false })
    @IsNumber()
    usuario: number

    constructor(variacao_produtoId: number, sku: string, plataformaId: number, usuarioId: number) {
        this.variacao_produto = variacao_produtoId
        this.sku = sku
        this.plataforma = plataformaId
        this.usuario = usuarioId
    }
}