import { IsNotEmpty, IsNumber } from "class-validator";

export class InserirFaturaCartaoCreditoDto {

    @IsNotEmpty()
    @IsNumber()
    cartao_credito: number
}