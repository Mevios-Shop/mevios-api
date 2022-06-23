import { AtualizarTipoReceitaBancariaDto } from './dto/atualizar-tipo-receita-bancaria.dto';
import { InserirTipoReceitaBancariaDto } from './dto/inserir-tipo-receita-bancaria.dto';
import { TipoReceitaBancariaService } from './tipo-receita-bancaria.service';
import { TipoReceitaBancaria } from './entities/tipo-receita-bancaria.entity';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Param, Patch, Delete, HttpCode } from '@nestjs/common';

@Controller('tipo_receita')
export class TipoReceitaBancariaController {

    constructor(private tipoReceitaBancariaService: TipoReceitaBancariaService) {
        
    }

    @Post()
    inserir(@Body() inserirTipoDespesaDto: InserirTipoReceitaBancariaDto) {
        return this.tipoReceitaBancariaService.inserir(inserirTipoDespesaDto)
    }

    @Get()
    buscarStatusCompra(): Promise<TipoReceitaBancaria[]> {
        return this.tipoReceitaBancariaService.buscarStatusCompra()
    }

    @Get(':id')
    buscarPorId(@Param() params): Promise<TipoReceitaBancaria> {
        return this.tipoReceitaBancariaService.buscarPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: number, @Body() atualizarTipoReceitaBancariaDto: AtualizarTipoReceitaBancariaDto) {
        return this.tipoReceitaBancariaService.atualizar(id, atualizarTipoReceitaBancariaDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: number) {
        return this.tipoReceitaBancariaService.deletar(id)
    }
}
