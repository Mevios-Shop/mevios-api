import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class InserirTipoMovimentacaoBancariaDto {

    @IsString()
    @MaxLength(45)
    @IsNotEmpty()
    descricao: string
}