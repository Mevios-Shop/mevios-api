/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Request,UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ResultDto } from 'src/shared/result.dto';
import { ItemCompraService } from '../itens_compra/item_compra/item-compra.service';
import { ComprasService } from './compras.service';
import { AtualizarCompraDto } from './dto/atualizar-compra.dto';
import { InserirCompraDto } from './dto/inserir-compra.dto';
import { Compra } from './entities/compra.entity';

@Controller('compras')
export class ComprasController { 

    constructor(
        private comprasService: ComprasService,
        private itemCompraService: ItemCompraService
    ) {
        
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async inserir(@Body() inserirCompraDto: InserirCompraDto, @Request() req) {
        try {
            return await this.comprasService.inserir(inserirCompraDto, req.user)
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível inserir a compra', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async buscarCompras(@Request() req): Promise<Compra[]> {
        return await this.comprasService.buscarCompras(req.user)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async buscarCompraPorId(@Param() params, @Request() req) {
        return await this.comprasService.buscarCompraPorId(params.id, req.user)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async atualizar(@Param('id') id: number, @Body() atualizarCompraDto: AtualizarCompraDto, @Request() req) {
        return await this.comprasService.atualizar(id, atualizarCompraDto, req.user)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    async deletar(@Param('id') id: number, @Request() req) {

        
        await this.itemCompraService.deletarPorIdCompra(id, req.user)

        return await this.comprasService.deletar(id, req.user)
    }
}
