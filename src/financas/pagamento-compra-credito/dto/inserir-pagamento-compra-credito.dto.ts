import { IsNumber } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class InserirPagamentoCompraCreditoDto {

    @IsNotEmpty()
    @IsNumber()
    compra: number

    @IsNotEmpty()
    @IsNumber()
    despesa_cartao_credito: number
    
    @Column({ type: "datetime" })
    data: Date
}