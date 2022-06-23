import { AtualizarPagamentoCompraCreditoDto } from './dto/atualizar-pagamento-compra-credito.dto';
import { InserirPagamentoCompraCreditoDto } from './dto/inserir-pagamento-compra-credito.dto';
import { PagamentoCompraCreditoService } from './pagamento-compra-credito.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Body, Post, Get, Param, Patch, Delete, HttpCode } from '@nestjs/common';

@Controller('pagamento_compra_credito')
export class PagamentoCompraCreditoController {

    constructor(private pagamentoCompraCreditoService: PagamentoCompraCreditoService) {
        
    }

    @Post()   
    inserir(@Body() inserirPagamentoCompraCreditoDto: InserirPagamentoCompraCreditoDto) {
        return this.pagamentoCompraCreditoService.inserir(inserirPagamentoCompraCreditoDto)
    }

    @Get()
    buscar() {
        return this.pagamentoCompraCreditoService.buscar()
    }

    @Get(':id')
    buscarPorId(@Param() params) {
        return this.pagamentoCompraCreditoService.buscarPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: number, @Body() atualizarPagamentoCompraCreditoDto: AtualizarPagamentoCompraCreditoDto) {
        return this.pagamentoCompraCreditoService.atualizar(id, atualizarPagamentoCompraCreditoDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: number) {
        return this.pagamentoCompraCreditoService.deletar(id)
    }
}
