import { IsBoolean, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class InserirProdutoDto {

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    nome: string

    @IsBoolean()
    @IsNotEmpty()
    habilitado: boolean
}