/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { AtualizarMovimentacaoBancariaDto } from './dto/atualizar-movimentacao-bancaria.dto';
import { InserirMovimentacaoBancariaDto } from './dto/inserir-movimentacao-bancaria.dto';
import { MovimentacaoBancariaService } from './movimentacao-bancaria.service';

@Controller('movimentacao_bancaria')
export class MovimentacaoBancariaController {

    constructor(private movimentacaoBancariaService: MovimentacaoBancariaService) {
        
    }

    @Post()   
    inserir(@Body() inserirMovimentacaoBancariaDto: InserirMovimentacaoBancariaDto) {
        return this.movimentacaoBancariaService.inserir(inserirMovimentacaoBancariaDto)
    }

    @Get(':id')
    buscarPorId(@Param() params) {
        return this.movimentacaoBancariaService.buscarPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: number, @Body() atualizarMovimentacaoBancariaDto: AtualizarMovimentacaoBancariaDto) {
        return this.movimentacaoBancariaService.atualizar(id, atualizarMovimentacaoBancariaDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: number) {
        return this.movimentacaoBancariaService.deletar(id)
    }
}
