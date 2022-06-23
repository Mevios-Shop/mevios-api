import { StatusRastreamentoVenda } from './../../status-rastreamento-venda/entities/status-rastreamento-venda.entity';
import { IsNumber } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { Venda } from './../../venda/entities/venda.entity';
import { MaxLength } from 'class-validator';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { type } from 'os';
import { Plataforma } from 'src/plataformas/entities/plataforma.entity';

@Entity()
export class RastreamentoVenda {
    
    @PrimaryGeneratedColumn()
    id: number

    @MaxLength(45)
    @Column({type: 'varchar', nullable: true, unique: true })
    codigo_rastreamento: string

    @ManyToOne(type => Venda, venda => venda.id, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    venda: number

    @Column({ type: "decimal", nullable: true })
    custo_frete: number

    @ManyToOne(type => Plataforma, plataforma => plataforma.id)
    @IsNotEmpty()
    @IsNumber()
    plataforma: number

    @Column({ type: "datetime", nullable: true })
    data_envio: Date

    @Column({ type: "datetime", nullable: true })
    data_entrega: Date

    constructor(codigo_rastreamento: string, vendaId: number, custo_frete: number, plataformaId: number, data_envio: Date, data_entrega: Date) {
        this.codigo_rastreamento = codigo_rastreamento
        this.venda = vendaId
        this.custo_frete = custo_frete
        this.plataforma = plataformaId
        this.data_envio = data_envio
        this.data_entrega = data_entrega
    }
}