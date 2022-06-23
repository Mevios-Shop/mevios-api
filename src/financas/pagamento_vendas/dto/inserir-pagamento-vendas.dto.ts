import { IsNotEmpty, IsNumber } from "class-validator"
import { Column } from "typeorm"

export class InserirPagamentoVendasDto {

    @IsNotEmpty()
    @IsNumber()
    plataforma: number

    @IsNotEmpty()
    @IsNumber()
    receita_bancaria: number

    @Column({ type: "datetime" })
    data: Date
}