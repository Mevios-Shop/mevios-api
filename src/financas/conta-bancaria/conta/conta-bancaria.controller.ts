/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ContaBancariaService } from './conta-bancaria.service';
import { AtualizarContaBancariaDto } from './dto/atualizar-conta-bancaria.dto';
import { InserirContaBancariaDto } from './dto/inserir-conta-bancaria.dto';
import { ContaBancaria } from './entities/conta-bancaria.entity';

@Controller('contas')
export class ContaBancariaController { 

    constructor(private contaBancariaService: ContaBancariaService) {
        
    }

    @Post()
    inserir(@Body() inserirContaBancariaDto: InserirContaBancariaDto) {
        return this.contaBancariaService.inserir(inserirContaBancariaDto)
    }

    @Get()
    buscar(): Promise<ContaBancaria[]> {
        return this.contaBancariaService.buscar()
    }

    @Get(':id')
    buscarPorId(@Param() params): Promise<ContaBancaria> {
        return this.contaBancariaService.buscarPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: string, @Body() atualizarContaBancariaDto: AtualizarContaBancariaDto) {
        return this.contaBancariaService.atualizar(+id, atualizarContaBancariaDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: string) {
        return this.contaBancariaService.deletar(+id)
    }
}
