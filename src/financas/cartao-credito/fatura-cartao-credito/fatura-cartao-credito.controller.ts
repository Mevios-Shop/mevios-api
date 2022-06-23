/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { AtualizarFaturaCartaoCreditoDto } from './dto/atualizar-fatura-cartao-credito.dto';
import { InserirFaturaCartaoCreditoDto } from './dto/inserir-fatura-cartao-credito.dto';
import { FaturaCartaoCreditoService } from './fatura-cartao-credito.service';

@Controller('fatura_cartao_credito')
export class FaturaCartaoCreditoController {

    constructor(private faturaCartaoCreditoService: FaturaCartaoCreditoService) {
        
    }

    @Post()   
    inserir(@Body() iserirFaturaCartaoCreditoDto: InserirFaturaCartaoCreditoDto) {
        return this.faturaCartaoCreditoService.inserir(iserirFaturaCartaoCreditoDto)
    }

    @Get()
    buscar() {
        return this.faturaCartaoCreditoService.buscar()
    }

    @Get(':id')
    buscarPorId(@Param() params) {
        return this.faturaCartaoCreditoService.buscarPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: number, @Body() atualizarFaturaCartaoCreditoDto: AtualizarFaturaCartaoCreditoDto) {
        return this.faturaCartaoCreditoService.atualizar(id, atualizarFaturaCartaoCreditoDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: number) {
        return this.faturaCartaoCreditoService.deletar(id)
    }
}
