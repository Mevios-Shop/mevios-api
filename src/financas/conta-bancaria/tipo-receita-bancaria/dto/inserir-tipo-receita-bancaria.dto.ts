import { IsNotEmpty, IsString } from "class-validator";

export class InserirTipoReceitaBancariaDto {

    @IsString()
    @IsNotEmpty()
    descricao: string
}