import { IsDate, IsDecimal, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"
import { Plataforma } from "src/plataformas/entities/plataforma.entity"
import { Column, ManyToOne } from "typeorm"

export class InserirCompraDto {

    @IsNotEmpty({message: "O campo data não pode ser vazio"})
    data: string

    @Column({ type: "datetime" })
    data_recebimento: Date

    @Column({ type: "decimal", precision: 10, scale: 2 })
    valor_frete: number

    @IsNotEmpty()
    @Column({ type: "decimal", precision: 10, scale: 2 })
    valor_total: number

    @IsString()
    @MaxLength(45)
    @Column()
    codigo_pedido: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(45)
    @Column()
    codigo_rastreamento: string

    @IsNotEmpty()
    @IsNumber()
    plataforma: number

    @IsNotEmpty()
    @IsNumber()
    status_compraId: number

    @IsNumber()
    usuario: number
}