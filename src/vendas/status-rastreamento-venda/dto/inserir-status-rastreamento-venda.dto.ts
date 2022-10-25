import { IsNotEmpty, IsNumber } from 'class-validator';
import { IsString } from 'class-validator';
import { Column } from 'typeorm';
export class InserirStatusRastreamentoVendaDto {

    @IsString()
    @IsNotEmpty()
    @Column()
    descricao: string
}