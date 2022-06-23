import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"
import { Column } from "typeorm"

export class InserirCartaoCreditoDto {

    @IsString()
    @MaxLength(45)
    @IsNotEmpty()
    @Column()
    descricao: string

    @IsNotEmpty()
    @Column({ type: "decimal", precision: 10, scale: 2 })
    limite: number

    @Column({ type: "datetime" })
    data_vencimento: Date

    @Column({ type: "datetime" })
    data_fechamento: Date

    @IsNumber()
    conta_bancariaId: number
}