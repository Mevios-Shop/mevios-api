import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"

export class InserirVendaDto {

    data: Date
    comissao: number
    valor_frete: number
    valor_reembolso: number

    @IsNotEmpty()
    @IsString()
    @MaxLength(45)
    codigo_pedido: string

    @IsNotEmpty()
    @IsNumber()
    plataforma: number

    @IsNotEmpty()
    @IsNumber()
    status_venda: number

    @IsNumber()
    usuario: number

    constructor(data: Date, plataformaId: number, status_venda: number, usuario: number, comissao: number, valor_frete: number, valor_reembolso: number, codigo_pedido: string) {
        this.data = data
        this.plataforma = plataformaId
        this.status_venda = status_venda
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
        this.usuario = usuario
    }
}