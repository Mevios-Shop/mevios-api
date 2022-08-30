import { MaxLength } from 'class-validator';
import { Column } from 'typeorm';
import { IsNumber } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
export class InserirRastreamentoVendaDto {

    @MaxLength(45)
    @Column({type: 'varchar', nullable: true, unique: true })
    codigo_rastreamento: string

    @IsNotEmpty()
    @IsNumber()
    _venda: number

    @Column({ type: "decimal", nullable: true })
    custo_frete: number

    @IsNotEmpty()
    @IsNumber()
    plataforma: number

    @Column({ type: "datetime", nullable: true })
    data_envio: Date

    @Column({ type: "datetime", nullable: true })
    data_entrega: Date

    @IsNumber()
    usuario: number

    constructor(codigo_rastreamento: string, plataformaId: number, usuario: number, vendaId?: number, custo_frete?: number, data_envio?: Date, data_entrega?: Date) {
        this.codigo_rastreamento = codigo_rastreamento
        this.plataforma = plataformaId
        this._venda = vendaId
        this.custo_frete = custo_frete
        this.data_envio = data_envio
        this.data_entrega = data_entrega
        this.usuario = usuario
    }

    
    set venda(venda : number) {
        this._venda = venda;
    }
    
}