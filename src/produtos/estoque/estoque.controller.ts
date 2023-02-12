import { AtualizarEstoqueDto } from './dto/atualizar-estoque.dto';
import { Estoque } from './entities/estoque.entity';
import { InserirEstoqueDto } from './dto/inserir-estoque.dto';
import { EstoqueService } from './estoque.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('estoque')
export class EstoqueController {

    constructor(private estoqueService: EstoqueService) {

    }

    @Post()
    @UseGuards(JwtAuthGuard)
    inserir(@Body() inserirEstoqueDto: InserirEstoqueDto[], @Request() req) {

        return this.estoqueService.inserir(inserirEstoqueDto, req.user)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async buscar(@Request() req): Promise<Estoque[]> {
        return await this.estoqueService.buscar(req.user)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async buscarPorId(@Param() params, @Request() req): Promise<Estoque> {
        return await this.estoqueService.buscarPorId(params.id, req.user)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async atualizar(@Param('id') id: string, @Body() atualizarEstoqueDto: AtualizarEstoqueDto, @Request() req) {
        return this.estoqueService.atualizar(+id, atualizarEstoqueDto, req.user)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    deletar(@Param('id') id: string, @Request() req) {
        return this.estoqueService.deletar(+id, req.user)
    }
}
