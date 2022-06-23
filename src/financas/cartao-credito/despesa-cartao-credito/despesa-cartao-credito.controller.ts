/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common"
import { DespesaCartaoCreditoService } from "./despesa-cartao-credito.service"
import { AtualizarDespesaCartaoCreditoDto } from "./dto/atualizar-despesa-cartao-credito.dto"
import { InserirDespesaCartaoCreditoDto } from "./dto/inserir-despesa-cartao-credito.dto"

@Controller('despesa_cartao')
export class DespesaCartaoCreditoController {

    constructor(private despesaCartaoCreditoService: DespesaCartaoCreditoService) {
        
    }

    @Post()   
    inserir(@Body() inserirDespesaCartaoCreditoDto: InserirDespesaCartaoCreditoDto) {
        return this.despesaCartaoCreditoService.inserir(inserirDespesaCartaoCreditoDto)
    }

    @Get(':id')
    buscarPorId(@Param() params) {
        return this.despesaCartaoCreditoService.buscarPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: number, @Body() atualizarMovimentacaoBancariaDto: AtualizarDespesaCartaoCreditoDto) {
        return this.despesaCartaoCreditoService.atualizar(id, atualizarMovimentacaoBancariaDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: number) {
        return this.despesaCartaoCreditoService.deletar(id)
    }
}
