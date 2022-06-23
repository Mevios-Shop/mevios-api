import { AtualizarEstoqueDto } from './dto/atualizar-estoque.dto';
import { Estoque } from './entities/estoque.entity';
import { InserirEstoqueDto } from './dto/inserir-estoque.dto';
import { EstoqueService } from './estoque.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';

@Controller('estoque')
export class EstoqueController {

    constructor(private estoqueService: EstoqueService) {
        
    }

    @Post()
    inserir(@Body() inserirEstoqueDto: InserirEstoqueDto[]) {

        /*
        inserirEstoqueDto.forEach(element => {
            try {
                this.estoqueService.inserir(element)
            } catch (error) {
                return error
            }
        });*/

        return this.estoqueService.inserir(inserirEstoqueDto)
    }

    @Get()
    buscar(): Promise<Estoque[]> {
        return this.estoqueService.buscarTodos()
    }

    @Get(':id')
    buscarPorId(@Param() params): Promise<Estoque> {
        return this.estoqueService.buscarPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: string, @Body() atualizarEstoqueDto: AtualizarEstoqueDto) {
        return this.estoqueService.atualizar(+id, atualizarEstoqueDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: string) {
        return this.estoqueService.deletar(+id)
    }
}
