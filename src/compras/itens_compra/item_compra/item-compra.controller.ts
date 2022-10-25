/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AtualizarItemCompraDto } from './dto/atualizar-item-compra.dto';
import { InserirItemCompraDto } from './dto/inserir-item-compra.dto';
import { ItemCompra } from './entities/item-compra.entity';
import { ItemCompraService } from './item-compra.service';

@Controller('item_compra')
export class ItemCompraController {

    constructor(private itemCompraService: ItemCompraService) {
        
    }

    @Post()   
    @UseGuards(AuthGuard('jwt'))
    inserir(@Body() inserirItemCompraDto: InserirItemCompraDto, @Request() req) {
        return this.itemCompraService.inserir(inserirItemCompraDto, req.user)
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    buscarPorId(@Param() params, @Request() req) {
        return this.itemCompraService.buscarPorId(params.id, req.user)
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    atualizar(@Param('id') id: number, @Body() atualizarItemCompraDto: AtualizarItemCompraDto, @Request() req) {
        return this.itemCompraService.atualizar(id, atualizarItemCompraDto, req.user)
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(204)
    deletar(@Param('id') id: number, @Request() req) {
        return this.itemCompraService.deletar(id, req.user)
    }

}
