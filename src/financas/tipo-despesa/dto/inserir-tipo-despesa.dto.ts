import { Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { IsString } from 'class-validator';
export class InserirTipoDespesaDto {

    @IsString()
    @IsNotEmpty()
    @Column()
    descricao: string
}