import { StatusVenda } from './../../status-venda/entities/status-venda.entity';
import { Plataforma } from './../../../plataformas/entities/plataforma.entity';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Venda {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "datetime" })
    data: Date

    @Column({ type: "decimal", nullable: true })
    valor_frete: number

    @Column({ type: "decimal", nullable: true })
    valor_reembolso: number

    @IsNotEmpty()
    @IsString()
    @MaxLength(45)
    @Column({ unique: true, nullable: true, default: 'N/A' })
    codigo_pedido: string

    @ManyToOne(type => Plataforma, plataforma => plataforma.id, { nullable: true })
    @IsNotEmpty()
    @IsNumber()
    plataforma: number

    @ManyToOne(type => StatusVenda, status_venda => status_venda.id, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    status_venda: number

    constructor(data: Date, codigo_pedido: string, plataformaId: number, status_vendaId: number, valor_frete?: number, valor_reembolso?: number) {
        this.data = data
        this.valor_frete = valor_frete
        this.valor_reembolso = valor_reembolso
        this.codigo_pedido = codigo_pedido
        this.plataforma = plataformaId
        this.status_venda = status_vendaId
    }
}