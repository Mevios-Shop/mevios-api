import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column } from "typeorm";

export class InserirStatusCompraDto {
    
    @IsString()
    @IsNotEmpty()
    @Column()
    descricao: string
}