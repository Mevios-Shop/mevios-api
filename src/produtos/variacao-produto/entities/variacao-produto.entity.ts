import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { Produto } from "src/produtos/produto/entities/produto.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VariacaoProduto {

    @PrimaryGeneratedColumn()
    id: number

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @Column()
    descricao: string

    @ManyToOne(type => Produto, produto => produto.id, {nullable: false, eager: true })
    @IsNotEmpty()
    @IsNumber()
    produto: number

    @ManyToOne(type => Usuario, usuario => usuario.id, { nullable: true, eager: false })
    @IsNumber()
    usuario: number
}