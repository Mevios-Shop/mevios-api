/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { InserirItemCompraDto } from './dto/inserir-item-compra.dto';
import { ItemCompraService } from './item-compra.service';

@Controller('itens_compra')
export class ItensCompraController { 

    constructor(private itemCompraService: ItemCompraService) {
        
    }

    @Post()   
    inserir(@Body() inserirItensCompraDto: InserirItemCompraDto) {
        return this.itemCompraService.inserirVarios(inserirItensCompraDto)
    }

    @Get(':compraId')
    buscarPorIdCompra(@Param() params) {
        return this.itemCompraService.buscarPorIdCompra(params.compraId)
    }

    @Delete(':id_compra')
    @HttpCode(204)
    deletar(@Param('id_compra') id_compra: number) {
        return this.itemCompraService.deletarPorIdCompra(id_compra)
    }
}
