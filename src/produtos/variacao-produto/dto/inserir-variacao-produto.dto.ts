import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { Column } from "typeorm";

export class InserirVariacaoProdutoDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @Column()
    descricao: string

    @IsNumber()
    @IsNotEmpty()
    produtoId: Number
}