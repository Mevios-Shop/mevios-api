import { IsNotEmpty, IsNumber } from "class-validator"
import { Column } from "typeorm"

export class InserirMovimentacaoBancariaDto {

    @IsNotEmpty()
    @IsNumber()
    conta_bancariaId: number

    @IsNotEmpty()
    @Column({ type: "decimal", precision: 10, scale: 2 })
    valor: number

    @IsNotEmpty()
    @Column({ type: "decimal", precision: 10, scale: 2 })
    saldo: number

    @IsNotEmpty()
    @IsNumber()
    tipo_movimentacao_bancariaId: number

    @Column({ type: "datetime" })
    data: Date
}