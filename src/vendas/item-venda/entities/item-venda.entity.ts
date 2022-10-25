import { VariacaoProduto } from './../../../produtos/variacao-produto/entities/variacao-produto.entity';
import { Venda } from './../../venda/entities/venda.entity';
import { Estoque } from './../../../produtos/estoque/entities/estoque.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity()
export class ItemVenda {

    @PrimaryGeneratedColumn()
    id: number
    
    @ManyToOne(type => Estoque, estoque => estoque.id, { nullable: false, })
    @Unique(['estoque', 'ItemVenda'])
    @IsNotEmpty()
    @IsNumber()
    estoque: number

    @ManyToOne(type => VariacaoProduto, variacao_produto => variacao_produto.id, { nullable: false, eager: true })
    @IsNotEmpty()
    @IsNumber()
    variacao_produto: number

    @ManyToOne(type => Venda, venda => venda.id, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    venda: number

    @IsNotEmpty()
    @Column({ type: "decimal", precision: 10, scale: 2 })
    valor: number

    @ManyToOne(type => Usuario, usuario => usuario.id, { nullable: false, eager: false })
    @IsNumber()
    usuario: number

    constructor(estoqueId: number, vendaId: number, valor: number, usuario: number) {
        this.estoque = estoqueId
        this.venda = vendaId
        this.valor = valor
        this.usuario = usuario
    }
}