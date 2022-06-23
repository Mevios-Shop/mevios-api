import { IsNotEmpty, IsNumber } from "class-validator"
import { Column, PrimaryGeneratedColumn } from "typeorm"

export class InserirPagamentoCompraDebitoDto {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @IsNumber()
    movimentacao_bancariaId: number

    @IsNotEmpty ()
    @IsNumber()
    compraId: number

    @IsNotEmpty()
    @IsNumber()
    metodo_pagamentoId: number

    @Column({ type: "datetime" })
    data: Date
}