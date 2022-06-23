import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"
import { Column } from "typeorm"

export class InserirDespesaCartaoCreditoDto {

    @IsNotEmpty()
    @IsNumber()
    cartao_creditoId: number

    @IsNotEmpty()
    @Column({ type: "decimal", precision: 10, scale: 2 })
    valor: number

    @IsNotEmpty()
    @IsNumber()
    @Column()
    quantidade_parcelas: number

    @IsString()
    @MaxLength(45)
    @IsNotEmpty()
    @Column()
    descricao: string

    @IsNotEmpty()
    @IsNumber()
    fatura_cartao_creditoId: number

    @IsNotEmpty()
    @IsNumber()
    tipo_despesa: number

    @Column({ type: "datetime" })
    data: Date
}