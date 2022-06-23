import { AtualizarTipoDespesaDto } from './dto/atualizar-tipo-despesa.dto';
import { TipoDespesa } from './entities/tipo-despesa.entity';
import { InserirTipoDespesaDto } from './dto/inserir-tipo-despesa.dto';
import { TipoDespesaService } from './tipo-despesa.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post, Body, Get, Param, Patch, Delete, HttpCode } from '@nestjs/common';

@Controller('tipo_despesa')
export class TipoDespesaController {

    constructor(private statusCompraService: TipoDespesaService) {
        
    }

    @Post()
    inserir(@Body() inserirTipoDespesaDto: InserirTipoDespesaDto) {
        return this.statusCompraService.inserir(inserirTipoDespesaDto)
    }

    @Get()
    buscarStatusCompra(): Promise<TipoDespesa[]> {
        return this.statusCompraService.buscarStatusCompra()
    }

    @Get(':id')
    buscarStatusCompraPorId(@Param() params) {
        return this.statusCompraService.buscarStatusCompraPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: number, @Body() atualizarTipoDespesaDto: AtualizarTipoDespesaDto) {
        return this.statusCompraService.atualizar(id, atualizarTipoDespesaDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: number) {
        return this.statusCompraService.deletar(id)
    }
}
