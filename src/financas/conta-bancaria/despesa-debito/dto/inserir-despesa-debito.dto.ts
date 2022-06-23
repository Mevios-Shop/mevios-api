import { IsNumber } from 'class-validator';
import { Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { MaxLength } from 'class-validator';
import { IsString } from 'class-validator';
export class InserirDespesaDebitoDto {

    @IsString()
    @MaxLength(45)
    @IsNotEmpty()
    @Column()
    descricao: string

    @IsNotEmpty()
    @IsNumber()
    tipo_despesa: number

    @Column({ type: "datetime" })
    data: Date

    @IsNotEmpty()
    @IsNumber()
    conta_bancaria: number

    @IsNotEmpty()
    @IsNumber()
    movimentacao_bancaria: number

    @IsNotEmpty()
    @Column({ type: "decimal", precision: 10, scale: 2 })
    valor: number
}