import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"
import { Column } from "typeorm"

export class InserirVendaDto {

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
    _codigo_pedido: string

    @IsNotEmpty()
    @IsNumber()
    plataforma: number

    @IsNotEmpty()
    @IsNumber()
    status_venda: number

    @IsNumber()
    usuario: number

    constructor(data: Date, plataformaId: number, status_venda: number, usuario: number, valor_frete?: number, valor_reembolso?: number, codigo_pedido?: string) {
        this.data = data
        this.plataforma = plataformaId
        this.status_venda = status_venda
        this.valor_frete = valor_frete
        this.valor_reembolso = valor_reembolso
        this._codigo_pedido = codigo_pedido
        this.usuario = usuario
    }

    get codigo_pedido(): string {
        return this._codigo_pedido
    }
}