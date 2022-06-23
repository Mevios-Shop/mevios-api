import { IsNotEmpty, IsNumber } from "class-validator"

export class InserirReceitaBancariaDto {

    @IsNotEmpty()
    @IsNumber()
    conta_bancaria: number

    @IsNotEmpty()
    @IsNumber()
    movimentacao_bancaria: number

    @IsNotEmpty()
    @IsNumber()
    tipo_receita_bancaria: number
}