/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { AtualizarPagamentoFaturaCartaoCreditoDto } from './dto/atualizar-pagamento-fatura-cartao-credito.dto';
import { InserirPagamentoFaturaCartaoCreditoDto } from './dto/inserir-pagamento-fatura-cartao-credito.dto';
import { PagamentoFaturaCartaoCreditoService } from './pagamento-fatura-cartao-credito.service';

@Controller('pagamento_fatura')
export class PagamentoFaturaCartaoCreditoController { 

    constructor(private pagamentoFaturaCartaoCreditoService: PagamentoFaturaCartaoCreditoService) {
        
    }

    @Post()   
    inserir(@Body() inserirPagamentoFaturaCartaoCreditoDto: InserirPagamentoFaturaCartaoCreditoDto) {
        return this.pagamentoFaturaCartaoCreditoService.inserir(inserirPagamentoFaturaCartaoCreditoDto)
    }

    @Get(':id')
    buscarPorId(@Param() params) {
        return this.pagamentoFaturaCartaoCreditoService.buscarPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: number, @Body() atualizarPagamentoFaturaCartaoCreditoDto: AtualizarPagamentoFaturaCartaoCreditoDto) {
        return this.pagamentoFaturaCartaoCreditoService.atualizar(id, atualizarPagamentoFaturaCartaoCreditoDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: number) {
        return this.pagamentoFaturaCartaoCreditoService.deletar(id)
    }
}
