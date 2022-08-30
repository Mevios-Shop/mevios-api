import { Column } from 'typeorm';
import { IsNumber } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
export class InserirSkuProdutoDto {

    @IsNotEmpty()
    @IsNumber()
    variacao_produto: number

    @IsNotEmpty()
    @Column({ type: "text", nullable: false })
    sku: string

    @IsNotEmpty()
    @IsNumber()
    plataforma: number

    @IsNumber()
    usuario: number
}