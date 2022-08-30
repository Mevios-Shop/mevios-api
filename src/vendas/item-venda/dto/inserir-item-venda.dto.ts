import { IsNotEmpty, IsNumber } from "class-validator"

export class InserirItemVendaDto {

    @IsNotEmpty()
    @IsNumber()
    _estoque: number

    @IsNotEmpty()
    @IsNumber()
    _variacao_produto: number

    @IsNotEmpty()
    @IsNumber()
    _venda: number

    @IsNotEmpty()
    valor: number

    @IsNotEmpty()
    comissao: number
    @IsNumber()
    usuario: number

    constructor(valor: number,variacao_produtoId: number, usario: number ,comissao?: number, estoqueId?: number, vendaId?: number) {
        this.valor = valor
        this.comissao = comissao
        this._estoque = estoqueId
        this.venda = vendaId
        this._variacao_produto = variacao_produtoId
        this.usuario = usario
    }

    set estoque(estoqueId: number) {
        this._estoque = estoqueId
    }

    set venda(vendaId: number) {
        this._venda = vendaId
    }

    get variacao_produto(): number {
        return this._variacao_produto
    }
}