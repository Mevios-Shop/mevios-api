import { InserirItemVendaDto } from './dto/inserir-item-venda.dto';
import { AtualizarItemVendaDto } from './dto/atualizar-item-venda.dto';
import { ItemVendaService } from './item-venda.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('item_venda')
export class ItemVendaController { 

    constructor(private itemVendaService: ItemVendaService) {
        
    }

    @Post() 
    @UseGuards(JwtAuthGuard)
    async inserir(@Body() inserirItemVendaDto: InserirItemVendaDto, @Request() req) {
        return await this.itemVendaService.inserir(inserirItemVendaDto, req.user)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async buscarPorId(@Param() params, @Request() req) {
        return await this.itemVendaService.buscarPorId(params.id, req.user)
    }

    @Patch(':id')
    async atualizar(@Param('id') id: number, @Body() atualizarItemVendaDto: AtualizarItemVendaDto, @Request() req) {
        return await this.itemVendaService.atualizar(id, atualizarItemVendaDto, req.user)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    async deletar(@Param('id') id: number, @Request() req) {
        return await this.itemVendaService.deletar(id, req.user)
    }
}
