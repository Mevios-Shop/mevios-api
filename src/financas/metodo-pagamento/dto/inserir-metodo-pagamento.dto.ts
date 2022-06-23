import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class InserirMetodoPagamentoDto {

    @IsString()
    @MaxLength(45)
    @IsNotEmpty()
    descricao: string
}