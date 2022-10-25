/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { AtualizarStatusItemCompraDto } from './dto/atualizar-status-item-compra.dto';
import { InserirStatusItemCompraDto } from './dto/inserir-status-item-compra.dto';
import { StatusItemCompra } from './entities/status-item-compra.entity';
import { StatusItemCompraService } from './status-item-compra.service';

@Controller('status_item_compra')
export class StatusItemCompraController {

    constructor(private statusItemCompraService: StatusItemCompraService) {
        
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async inserir(@Body() inserirStatusItemCompraDto: InserirStatusItemCompraDto, @Request() req) {
        return this.statusItemCompraService.inserir(inserirStatusItemCompraDto, req.user)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async buscarStatusItemCompra(@Request() req): Promise<StatusItemCompra[]> {
        return this.statusItemCompraService.buscarStatusItemCompra(req.user)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async buscarStatusItemCompraPorId(@Param() params, @Request() req) {
        return this.statusItemCompraService.buscarStatusItemCompraPorId(params.id, req.user)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async atualizar(@Param('id') id: number, @Body() atualizarStatusItemCompraDto: AtualizarStatusItemCompraDto, @Request() req) {
        return this.statusItemCompraService.atualizar(id, atualizarStatusItemCompraDto, req.user)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deletar(@Param('id') id: number, @Request() req) {
        return this.statusItemCompraService.deletar(id, req.user)
    }

}
