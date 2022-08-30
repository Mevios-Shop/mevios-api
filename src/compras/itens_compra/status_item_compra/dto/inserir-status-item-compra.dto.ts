import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column } from "typeorm";

export class InserirStatusItemCompraDto {
    
    @IsString()
    @IsNotEmpty()
    @Column()
    descricao: string
}