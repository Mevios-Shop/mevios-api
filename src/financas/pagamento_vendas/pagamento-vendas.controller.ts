import { InserirPagamentoVendasDto } from './dto/inserir-pagamento-vendas.dto';
import { AtualizarPagamentoVendasDto } from './dto/atualizar-pagamento-vendas.dto';
import { PagamentoVendasService } from './pagamento-vendas.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';

@Controller('pagamento_vendas')
export class PagamentoVendasController { 

    constructor(private pagamentoVendasService: PagamentoVendasService) {
        
    }

    @Post()   
    inserir(@Body() inserirPagamentoVendasDto: InserirPagamentoVendasDto) {
        return this.pagamentoVendasService.inserir(inserirPagamentoVendasDto)
    }

    @Get()
    buscar() {
        return this.pagamentoVendasService.buscar()
    }

    @Get(':id')
    buscarPorId(@Param() params) {
        return this.pagamentoVendasService.buscarPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: number, @Body() atualizarPagamentoVendasDto: AtualizarPagamentoVendasDto) {
        return this.pagamentoVendasService.atualizar(id, atualizarPagamentoVendasDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: number) {
        return this.pagamentoVendasService.deletar(id)
    }
}
