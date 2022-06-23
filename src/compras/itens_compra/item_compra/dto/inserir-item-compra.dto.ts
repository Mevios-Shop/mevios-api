import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Column } from "typeorm"

export class InserirItemCompraDto {

    @IsNotEmpty()
    @IsNumber()
    variacao_produtoId: number

    @IsNotEmpty()
    @IsNumber()
    compraId: number

    @IsNumber()
    @IsNotEmpty()
    status_item_compraId: number

    @IsNotEmpty()
    @IsNumber()
    @Column()
    quantidade: number

    @IsNotEmpty()
    @Column({ type: "decimal", precision: 10, scale: 2 })
    valor: number

    @IsString()
    @Column({ type: "text", nullable: true })
    link_anuncio: string
}