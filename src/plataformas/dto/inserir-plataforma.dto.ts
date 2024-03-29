import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class InserirPlataformaDto {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    descricao: string
}