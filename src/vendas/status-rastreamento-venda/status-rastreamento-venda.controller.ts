import { AtualizarStatusRastreamentovendaDto } from './dto/atualizar-status-rastreamento-venda.dto';
import { StatusRastreamentoVenda } from './entities/status-rastreamento-venda.entity';
import { InserirStatusRastreamentoVendaDto } from './dto/inserir-status-rastreamento-venda.dto';
import { StatusRastreamentoVendaService } from './status-rastreamento-venda.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post, Body, Get, Param, Patch, Delete, HttpCode, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('status_rastreamento_venda')
export class StatusRastreamentoVendaController {

    constructor(private statusRastreamentoVendaService: StatusRastreamentoVendaService) {
        
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async inserir(@Body() inserirStatusRastreamentoVendaDto: InserirStatusRastreamentoVendaDto, @Request() req) {
        return await this.statusRastreamentoVendaService.inserir(inserirStatusRastreamentoVendaDto, req.user)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async buscarStatusRastreamentoVenda(@Request() req): Promise<StatusRastreamentoVenda[]> {
        return await this.statusRastreamentoVendaService.buscarStatusRastreamentoVenda(req.user)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async buscarStatusVendaPorId(@Param() params, @Request() req) {
        return await this.statusRastreamentoVendaService.buscarStatusRastreamentoVendaPorId(params.id, req.user)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async atualizar(@Param('id') id: number, @Body() atualizarStatusRastreamentoVendaDto: AtualizarStatusRastreamentovendaDto, @Request() req) {
        return await this.statusRastreamentoVendaService.atualizar(id, atualizarStatusRastreamentoVendaDto, req.user)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    async deletar(@Param('id') id: number, @Request() req) {
        return await this.statusRastreamentoVendaService.deletar(id, req.user)
    }
}
