import { StatusVenda } from './../../status-venda/entities/status-venda.entity';
import { Plataforma } from './../../../plataformas/entities/plataforma.entity';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity()
export class Venda {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "datetime" })
    data: Date

    @IsNotEmpty()
    @Column({ type: "decimal" , nullable: true, precision: 10, scale: 2 })
    comissao: number

    @Column({ type: "decimal", nullable: true })
    valor_frete: number

    @Column({ type: "decimal", nullable: true })
    valor_reembolso: number

    @IsNotEmpty()
    @IsString()
    @MaxLength(45)
    @Column({ unique: true, nullable: true, default: 'N/A' })
    codigo_pedido: string

    @ManyToOne(type => Plataforma, plataforma => plataforma.id, { nullable: true, eager: true })
    @IsNotEmpty()
    @IsNumber()
    plataforma: number

    @ManyToOne(type => StatusVenda, status_venda => status_venda.id, { nullable: false, eager: true })
    @IsNotEmpty()
    @IsNumber()
    status_venda: number

    @ManyToOne(type => Usuario, usuario => usuario.id, { nullable: false, eager: false })
    @IsNumber()
    usuario: number

    constructor(data: Date, codigo_pedido: string, plataformaId: number, status_vendaId: number, usuario: number, comissao, valor_frete: number, valor_reembolso: number) {
        this.data = data
        if (comissao > 0) {
            this.comissao = comissao
        }
        if (valor_frete > 0) {
            this.valor_frete = valor_frete
        }
        if (valor_reembolso > 0) {
            this.valor_reembolso = valor_reembolso
        }
        if (codigo_pedido) {
            this.codigo_pedido = codigo_pedido
        }
        this.plataforma = plataformaId
        this.status_venda = status_vendaId
        this.usuario = usuario
    }
}