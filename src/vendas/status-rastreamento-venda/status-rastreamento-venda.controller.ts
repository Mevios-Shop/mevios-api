import { AtualizarStatusRastreamentovendaDto } from './dto/atualizar-status-rastreamento-venda.dto';
import { StatusRastreamentoVenda } from './entities/status-rastreamento-venda.entity';
import { InserirStatusRastreamentoVendaDto } from './dto/inserir-status-rastreamento-venda.dto';
import { StatusRastreamentoVendaService } from './status-rastreamento-venda.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post, Body, Get, Param, Patch, Delete, HttpCode } from '@nestjs/common';

@Controller('status_rastreamento_venda')
export class StatusRastreamentoVendaController {

    constructor(private statusRastreamentoVendaService: StatusRastreamentoVendaService) {
        
    }

    @Post()
    inserir(@Body() inserirStatusRastreamentoVendaDto: InserirStatusRastreamentoVendaDto) {
        return this.statusRastreamentoVendaService.inserir(inserirStatusRastreamentoVendaDto)
    }

    @Get()
    buscarStatusRastreamentoVenda(): Promise<StatusRastreamentoVenda[]> {
        return this.statusRastreamentoVendaService.buscarStatusRastreamentoVenda()
    }

    @Get(':id')
    buscarStatusVendaPorId(@Param() params) {
        return this.statusRastreamentoVendaService.buscarStatusRastreamentoVendaPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: number, @Body() atualizarStatusRastreamentoVendaDto: AtualizarStatusRastreamentovendaDto) {
        return this.statusRastreamentoVendaService.atualizar(id, atualizarStatusRastreamentoVendaDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: number) {
        return this.statusRastreamentoVendaService.deletar(id)
    }
}
