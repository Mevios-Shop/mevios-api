/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { AtualizarStatusCompraDto } from './dto/atualizar-status-compra.dto';
import { InserirStatusCompraDto } from './dto/inserir-status-compra.dto';
import { StatusCompra } from './entities/status-compra.entity';
import { StatusCompraService } from './status-compra.service';

@Controller('status_compra')
export class StatusCompraController { 
    constructor(private statusCompraService: StatusCompraService) {
        
    }

    @Post()
    inserir(@Body() inserirStatusCompraDto: InserirStatusCompraDto) {
        return this.statusCompraService.inserir(inserirStatusCompraDto)
    }

    @Get()
    buscarStatusCompra(): Promise<StatusCompra[]> {
        return this.statusCompraService.buscarStatusCompra()
    }

    @Get(':id')
    buscarStatusCompraPorId(@Param() params) {
        return this.statusCompraService.buscarStatusCompraPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: number, @Body() atualizarStatusCompraDto: AtualizarStatusCompraDto) {
        return this.statusCompraService.atualizar(id, atualizarStatusCompraDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: number) {
        return this.statusCompraService.deletar(id)
    }
}
