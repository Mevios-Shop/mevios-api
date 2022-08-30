import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column } from "typeorm";

export class InserirStatusVendaDto {

    @IsString()
    @IsNotEmpty()
    @Column()
    descricao: string

    @IsNumber()
    usuario: number
}