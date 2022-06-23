import { AtualizarReceitaBancariaDto } from './dto/atualizar-receita-bancaria.dto';
import { InserirReceitaBancariaDto } from './dto/inserir-receita-bancaria.dto';
import { ReceitaBancariaService } from './receita-bancaria.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';

@Controller('receita_bancaria')
export class ReceitaBancariaController {

    constructor(private receitaBancariaService: ReceitaBancariaService) {
        
    }

    @Post()   
    inserir(@Body() inserirReceitaBancariaDto: InserirReceitaBancariaDto) {
        return this.receitaBancariaService.inserir(inserirReceitaBancariaDto)
    }

    @Get(':id')
    buscarPorId(@Param() params) {
        return this.receitaBancariaService.buscarPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: number, @Body() atualizarReceitaBancariaDto: AtualizarReceitaBancariaDto) {
        return this.receitaBancariaService.atualizar(id, atualizarReceitaBancariaDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: number) {
        return this.receitaBancariaService.deletar(id)
    }
}
