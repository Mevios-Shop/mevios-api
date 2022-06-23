import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class InserirContaBancariaDto {

    @IsString()
    @MaxLength(45)
    @IsNotEmpty()
    descricao: string
}