/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { AtualizarVariacaoProdutoDto } from './dto/atualizar-variacao-produto.dto';
import { InserirVariacaoProdutoDto } from './dto/inserir-variacao-produto.dto';
import { VariacaoProduto } from './entities/variacao-produto.entity';
import { VariacaoProdutoService } from './variacao-produto.service';

@Controller('variacao_produto')
export class VariacaoProdutoController {

    constructor(private variacaoProdutoService: VariacaoProdutoService) {

    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async inserir(@Body() inserirVaridacaoProdutoDto: InserirVariacaoProdutoDto, @Request() req) {
        return await this.variacaoProdutoService.inserir(inserirVaridacaoProdutoDto, req.user)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async buscarVariacoes(@Request() req): Promise<VariacaoProduto[]> {
        return await this.variacaoProdutoService.buscar(req.user)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async buscarVariacaoPorId(@Param() params, @Request() req) {
        return await this.variacaoProdutoService.buscarPorId(params.id, req.user)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async atualizar(@Param('id') id: string, @Body() atualizarVariacaoProdutoDto: AtualizarVariacaoProdutoDto, @Request() req) {
        return await this.variacaoProdutoService.atualizar(+id, atualizarVariacaoProdutoDto, req.user)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    async deletar(@Param('id') id: string, @Request() req) {
        return await this.variacaoProdutoService.deletar(+id, req.user)
    }
}