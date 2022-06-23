/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
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
    inserir(@Body() inserirCompraDto: InserirCompraDto) {
        return this.comprasService.inserir(inserirCompraDto)
    }

    @Get()
    buscarCompras(): Promise<Compra[]> {
        return this.comprasService.buscarCompras()
    }

    @Get(':id')
    buscarCompraPorId(@Param() params) {
        return this.comprasService.buscarCompraPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: number, @Body() atualizarCompraDto: AtualizarCompraDto) {
        return this.comprasService.atualizar(id, atualizarCompraDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: number) {

        
        this.itemCompraService.deletarPorIdCompra(id)

        return this.comprasService.deletar(id)
    }
}
