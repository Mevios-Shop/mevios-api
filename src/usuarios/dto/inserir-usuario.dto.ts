import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
export class InserirUsuarioDto {

    @IsNotEmpty()
    @IsString()
    nome: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    senha: string
}