import { AtualizarRastreamentoVendaDto } from './dto/atualizar-rastreamento-venda.dto';
import { InserirRastreamentoVendaDto } from './dto/inserir-rastreamento-venda.dto';
import { RastreamentoVendaService } from './rastreamento-venda.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';

@Controller('rastreamento_venda')
export class RastreamentoVendaController {

    constructor(private rastreamentoVendaService: RastreamentoVendaService) {
        
    }

    @Post()
    inserir(@Body() inserirRastreamentoVendaDto: InserirRastreamentoVendaDto) {
        return this.rastreamentoVendaService.inserir(inserirRastreamentoVendaDto)
    }

    @Get(':id')
    buscarPorId(@Param() params) {
        return this.rastreamentoVendaService.buscarPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: number, @Body() atualizarRastreamentoVendaDto: AtualizarRastreamentoVendaDto) {
        return this.rastreamentoVendaService.atualizar( id, atualizarRastreamentoVendaDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: number) {
        return this.rastreamentoVendaService.deletar(id)
    }
}
