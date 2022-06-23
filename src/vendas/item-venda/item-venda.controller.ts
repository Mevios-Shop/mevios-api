import { InserirItemVendaDto } from './dto/inserir-item-venda.dto';
import { AtualizarItemVendaDto } from './dto/atualizar-item-venda.dto';
import { ItemVendaService } from './item-venda.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';

@Controller('item_venda')
export class ItemVendaController { 

    constructor(private itemVendaService: ItemVendaService) {
        
    }

    @Post()   
    inserir(@Body() inserirItemVendaDto: InserirItemVendaDto) {
        return this.itemVendaService.inserir(inserirItemVendaDto)
    }

    @Get(':id')
    buscarPorId(@Param() params) {
        return this.itemVendaService.buscarPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: number, @Body() atualizarItemVendaDto: AtualizarItemVendaDto) {
        return this.itemVendaService.atualizar(id, atualizarItemVendaDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: number) {
        return this.itemVendaService.deletar(id)
    }
}
