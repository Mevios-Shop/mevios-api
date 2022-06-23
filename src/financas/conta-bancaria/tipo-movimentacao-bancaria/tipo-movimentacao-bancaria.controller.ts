/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { AtualizarTipoMovimentacaoBancariaDto } from './dto/atualizar-tipo-movimentacao-bancaria.dto';
import { InserirTipoMovimentacaoBancariaDto } from './dto/inserir-tipo-movimentacao-bancaria.dto';
import { TipoMovimentacaoBancaria } from './entities/tipo-movimentacao-bancaria.entity';
import { TipoMovimentacaoBancariaService } from './tipo-movimentacao-bancaria.service';

@Controller('tipo-movimentacao-bancaria')
export class TipoMovimentacaoBancariaController {

    constructor(private tipoMovimentacaoBancariaService: TipoMovimentacaoBancariaService) {
        
    }

    @Post()
    inserir(@Body() inserirTipoMovimentacaoBancariaDto: InserirTipoMovimentacaoBancariaDto) {
        return this.tipoMovimentacaoBancariaService.inserir(inserirTipoMovimentacaoBancariaDto)
    }

    @Get()
    buscar(): Promise<TipoMovimentacaoBancaria[]> {
        return this.tipoMovimentacaoBancariaService.buscar()
    }

    @Get(':id')
    buscarPorId(@Param() params): Promise<TipoMovimentacaoBancaria> {
        return this.tipoMovimentacaoBancariaService.buscarPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: string, @Body() atualizarTipoMovimentacaoBancariaDto: AtualizarTipoMovimentacaoBancariaDto) {
        return this.tipoMovimentacaoBancariaService.atualizar(+id, atualizarTipoMovimentacaoBancariaDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: string) {
        return this.tipoMovimentacaoBancariaService.deletar(+id)
    }
}
