import { IsNotEmpty, IsNumber } from "class-validator"
import { Column } from "typeorm"

export class InserirEstoqueDto {

    @IsNotEmpty()
    @IsNumber()
    variacao_produto: number

    @IsNotEmpty()
    @IsNumber()
    item_compra: number

    @Column({ type: "datetime" })
    data: Date

    @IsNumber()
    usuario: number
}