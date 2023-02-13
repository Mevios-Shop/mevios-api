/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { AtualizarStatusCompraDto } from './dto/atualizar-status-compra.dto';
import { InserirStatusCompraDto } from './dto/inserir-status-compra.dto';
import { StatusCompra } from './entities/status-compra.entity';
import { StatusCompraService } from './status-compra.service';

@Controller('status_compra')
export class StatusCompraController {
    constructor(private statusCompraService: StatusCompraService) {

    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async inserir(@Body() inserirStatusCompraDto: InserirStatusCompraDto, @Request() req) {
        return await this.statusCompraService.inserir(inserirStatusCompraDto, req.user)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async buscarStatusCompra(@Request() req): Promise<StatusCompra[]> {
        return await this.statusCompraService.buscar(req.user)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async buscarStatusCompraPorId(@Param() params, @Request() req) {
        return await this.statusCompraService.buscarPorId(params.id, req.user)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async atualizar(@Param('id') id: number, @Body() atualizarStatusCompraDto: AtualizarStatusCompraDto, @Request() req) {
        return await this.statusCompraService.atualizar(id, atualizarStatusCompraDto, req.user)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    async deletar(@Param('id') id: number, @Request() req) {
        return await this.statusCompraService.deletar(id, req.user)
    }
}
