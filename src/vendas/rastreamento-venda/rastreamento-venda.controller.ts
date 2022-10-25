import { AtualizarRastreamentoVendaDto } from './dto/atualizar-rastreamento-venda.dto';
import { InserirRastreamentoVendaDto } from './dto/inserir-rastreamento-venda.dto';
import { RastreamentoVendaService } from './rastreamento-venda.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('rastreamento_venda')
export class RastreamentoVendaController {

    constructor(private rastreamentoVendaService: RastreamentoVendaService) {
        
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async inserir(@Body() inserirRastreamentoVendaDto: InserirRastreamentoVendaDto, @Request() req) {
        return await this.rastreamentoVendaService.inserir(inserirRastreamentoVendaDto, req.user)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async buscarPorId(@Param() params, @Request() req) {
        return await this.rastreamentoVendaService.buscarPorId(params.id, req.user)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async atualizar(@Param('id') id: number, @Body() atualizarRastreamentoVendaDto: AtualizarRastreamentoVendaDto, @Request() req) {
        return await this.rastreamentoVendaService.atualizar( id, atualizarRastreamentoVendaDto, req.user)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    async deletar(@Param('id') id: number, @Request() req) {
        return await this.rastreamentoVendaService.deletar(id, req.user)
    }
}
