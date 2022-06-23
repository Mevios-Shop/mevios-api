/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { AtualizarMetodoPagamentoDto } from './dto/atualizar-metodo-pagamento.dto';
import { InserirMetodoPagamentoDto } from './dto/inserir-metodo-pagamento.dto';
import { MetodoPagamento } from './entities/metodo-pagamento.entity';
import { MetodoPagamentoService } from './metodo-pagamento.service';

@Controller('metodo_pagamento')
export class MetodoPagamentoController {

    constructor(private metodoPagamentoService: MetodoPagamentoService) {
        
    }

    @Post()
    inserir(@Body() inserirContaBancariaDto: InserirMetodoPagamentoDto) {
        return this.metodoPagamentoService.inserir(inserirContaBancariaDto)
    }

    @Get()
    buscar(): Promise<MetodoPagamento[]> {
        return this.metodoPagamentoService.buscar()
    }

    @Get(':id')
    buscarPorId(@Param() params): Promise<MetodoPagamento> {
        return this.metodoPagamentoService.buscarPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: string, @Body() atualizarMetodoPagamentoDto: AtualizarMetodoPagamentoDto) {
        return this.metodoPagamentoService.atualizar(+id, atualizarMetodoPagamentoDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: string) {
        return this.metodoPagamentoService.deletar(+id)
    }
}
