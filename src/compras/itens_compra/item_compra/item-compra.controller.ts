/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { AtualizarItemCompraDto } from './dto/atualizar-item-compra.dto';
import { InserirItemCompraDto } from './dto/inserir-item-compra.dto';
import { ItemCompra } from './entities/item-compra.entity';
import { ItemCompraService } from './item-compra.service';

@Controller('item_compra')
export class ItemCompraController {

    constructor(private itemCompraService: ItemCompraService) {
        
    }

    @Post()   
    inserir(@Body() inserirItemCompraDto: InserirItemCompraDto) {
        return this.itemCompraService.inserir(inserirItemCompraDto)
    }

    @Get(':id')
    buscarPorId(@Param() params) {
        return this.itemCompraService.buscarPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: number, @Body() atualizarItemCompraDto: AtualizarItemCompraDto) {
        return this.itemCompraService.atualizar(id, atualizarItemCompraDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: number) {
        return this.itemCompraService.deletar(id)
    }

}
