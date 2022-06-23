import { AtualizarDespesaDebitoDto } from './dto/atualizar-despesa-debito.dto';
import { InserirDespesaDebitoDto } from './dto/inserir-despesa-debito.dto';
import { DespesaDebitoService } from './despesa-debito.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common"

@Controller('despesa_debito')
export class DespesaDebitoController { 

    constructor(private despesaDebitoService: DespesaDebitoService) {
        
    }

    @Post()   
    inserir(@Body() inserirDespesaDebitoDto: InserirDespesaDebitoDto) {
        return this.despesaDebitoService.inserir(inserirDespesaDebitoDto)
    }

    @Get(':id')
    buscarPorId(@Param() params) {
        return this.despesaDebitoService.buscarPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: number, @Body() atualizarMovimentacaoBancariaDto: AtualizarDespesaDebitoDto) {
        return this.despesaDebitoService.atualizar(id, atualizarMovimentacaoBancariaDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: number) {
        return this.despesaDebitoService.deletar(id)
    }
}
