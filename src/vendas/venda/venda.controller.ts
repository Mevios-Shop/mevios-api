import { RastreamentoVendaService } from './../rastreamento-venda/rastreamento-venda.service';
import { RastreamentoVenda } from './../rastreamento-venda/entities/rastreamento-venda.entity';
import { ItemVendaService } from './../item-venda/item-venda.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { AtualizarVendaDto } from './dto/atualizar-venda.dto';
import { InserirVendaDto } from './dto/inserir-venda.dto';
import { Venda } from './entities/venda.entity';
import { VendaService } from './venda.service';

@Controller('venda')
export class VendaController {

    constructor(private vendasService: VendaService, private itemVendaService: ItemVendaService, private rastreamentoVendaService: RastreamentoVendaService) {
        
    }

    @Post()
    inserir(@Body() inserirVendaDto: InserirVendaDto) {
        
        return this.vendasService.inserir(inserirVendaDto)
    }

    @Get()
    buscarVendas(): Promise<Venda[]> {
        return this.vendasService.buscarVendas()
    }

    @Get(':id')
    buscarVendaPorId(@Param() params) {
        return this.vendasService.buscarVendaPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: number, @Body() atualizarVendaDto: AtualizarVendaDto) {
        return this.vendasService.atualizar(id, atualizarVendaDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: number) {
        return this.vendasService.deletar(id)
    }
}
