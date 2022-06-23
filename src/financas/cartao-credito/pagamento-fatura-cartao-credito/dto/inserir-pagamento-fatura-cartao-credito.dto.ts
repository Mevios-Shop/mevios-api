import { IsNotEmpty, IsNumber } from "class-validator"
import { Column } from "typeorm"

export class InserirPagamentoFaturaCartaoCreditoDto {

    @IsNotEmpty()
    @IsNumber()
    fatura_cartaoCreditoId: number

    @IsNotEmpty()
    @IsNumber()
    movimentacao_bancariaId: number

    @Column({ type: "datetime" })
    data: Date
}