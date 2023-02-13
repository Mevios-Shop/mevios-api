import { RastreamentoVendaService } from './../rastreamento-venda/rastreamento-venda.service';
import { ItemVendaService } from './../item-venda/item-venda.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AtualizarVendaDto } from './dto/atualizar-venda.dto';
import { InserirVendaDto } from './dto/inserir-venda.dto';
import { Venda } from './entities/venda.entity';
import { VendaService } from './venda.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('venda')
export class VendaController {

    constructor(
        private vendasService: VendaService) {

    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async inserir(@Body() inserirVendaDto: InserirVendaDto, @Request() req) {
        return await this.vendasService.inserir(inserirVendaDto, req.user)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async buscar(@Request() req): Promise<Venda[]> {
        return await this.vendasService.buscar(req.user)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async buscarPorId(@Param() params, @Request() req) {
        return await this.vendasService.buscarPorId(params.id, req.user)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async atualizar(@Param('id') id: number, @Body() atualizarVendaDto: AtualizarVendaDto, @Request() req) {
        return await this.vendasService.atualizar(id, atualizarVendaDto, req.user)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    async deletar(@Param('id') id: number, @Request() req) {
        return await this.vendasService.deletar(id, req.user)
    }
}
