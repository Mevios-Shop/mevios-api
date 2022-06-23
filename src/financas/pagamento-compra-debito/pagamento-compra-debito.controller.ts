/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { AtualizarPagamentoCompraDebitoDto } from './dto/atualizar-pagamento-compra-debito.dto';
import { InserirPagamentoCompraDebitoDto } from './dto/inserir-pagamento-compra-debito.dto';
import { PagamentoCompraDebitoService } from './pagamento-compra-debito.service';

@Controller('pagamento_compra_debito')
export class PagamentoCompraDebitoController {

    constructor(private pagamentoCompraDebitoService: PagamentoCompraDebitoService) {
        
    }

    @Post()   
    inserir(@Body() inserirPagamentoCompraDebitoDto: InserirPagamentoCompraDebitoDto) {
        return this.pagamentoCompraDebitoService.inserir(inserirPagamentoCompraDebitoDto)
    }

    @Get()
    buscar() {
        return this.pagamentoCompraDebitoService.buscar()
    }

    @Get(':id')
    buscarPorId(@Param() params) {
        return this.pagamentoCompraDebitoService.buscarPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: number, @Body() atualizarPagamentoCompraDebitoDto: AtualizarPagamentoCompraDebitoDto) {
        return this.pagamentoCompraDebitoService.atualizar(id, atualizarPagamentoCompraDebitoDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: number) {
        return this.pagamentoCompraDebitoService.deletar(id)
    }
}
