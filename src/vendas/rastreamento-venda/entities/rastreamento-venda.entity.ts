import { IsNumber } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { Venda } from './../../venda/entities/venda.entity';
import { MaxLength } from 'class-validator';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Plataforma } from 'src/plataformas/entities/plataforma.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity()
export class RastreamentoVenda {

    @PrimaryGeneratedColumn()
    id: number

    @MaxLength(45)
    @Column({ type: 'varchar', nullable: true, unique: true })
    codigo_rastreamento: string

    @OneToOne(type => Venda, venda => venda.id, { nullable: false })
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

    @ManyToOne(type => Usuario, usuario => usuario.id, { nullable: false, eager: false })
    @IsNumber()
    usuario: number

    constructor(codigo_rastreamento: string, vendaId: number, custo_frete: number, plataformaId: number, data_envio: Date, data_entrega: Date, usuarioId: number) {
        this.codigo_rastreamento = codigo_rastreamento
        this.venda = vendaId
        this.custo_frete = custo_frete
        this.plataforma = plataformaId
        this.data_envio = data_envio
        this.data_entrega = data_entrega
        this.usuario = usuarioId
    }
}