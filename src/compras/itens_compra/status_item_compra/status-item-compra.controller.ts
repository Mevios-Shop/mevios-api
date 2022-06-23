/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { AtualizarStatusItemCompraDto } from './dto/atualizar-status-item-compra.dto';
import { InserirStatusItemCompraDto } from './dto/inserir-status-item-compra.dto';
import { StatusItemCompra } from './entities/status-item-compra.entity';
import { StatusItemCompraService } from './status-item-compra.service';

@Controller('status_item_compra')
export class StatusItemCompraController {

    constructor(private statusItemCompraService: StatusItemCompraService) {
        
    }

    @Post()
    inserir(@Body() inserirStatusItemCompraDto: InserirStatusItemCompraDto) {
        return this.statusItemCompraService.inserir(inserirStatusItemCompraDto)
    }

    @Get()
    buscarStatusItemCompra(): Promise<StatusItemCompra[]> {
        return this.statusItemCompraService.buscarStatusItemCompra()
    }

    @Get(':id')
    buscarStatusItemCompraPorId(@Param() params) {
        return this.statusItemCompraService.buscarStatusItemCompraPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: number, @Body() atualizarStatusItemCompraDto: AtualizarStatusItemCompraDto) {
        return this.statusItemCompraService.atualizar(id, atualizarStatusItemCompraDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: number) {
        return this.statusItemCompraService.deletar(id)
    }

}
